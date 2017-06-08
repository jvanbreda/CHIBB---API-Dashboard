import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/services/http.service';
import { Sensor } from 'app/models/sensor.model';
import { House } from 'app/models/house.model';
import { Record } from 'app/models/record.model';
import { GraphGeneratorService } from 'app/services/graphgenerator.service';

declare var vis: any;

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  private houses: House[];
  private sensors: Sensor[];
  private records1 = []
  private records2 = []; 
  private dataSet;

  private selectedHouse: House;
  private selectedSensor1: Sensor;
  private selectedSensor2: Sensor;

  private functionCalled;

  constructor(private _http: HttpService, private _graphGenerator: GraphGeneratorService) { }

  ngOnInit() {
    this.functionCalled = false;
    this.dataSet = new vis.DataSet();
    this.getHouses();
  }

   getHouses(){
    this.houses = [];
    this._http.getHouses()
      .then(response => {
        switch (response.status){
          case 200:
            for(var i = 0; i < response.json().resultLength; i++){
              this.houses.unshift(new House(response.json().result[i].hid, response.json().result[i].address));
            }
            break;
          case 204:
            this.houses = [];
            break;
        }
      })
      .catch(error => {
        
      })
  }

  getSensorsFromSelectedHouse(){
    this.sensors = [];
    this._http.getSensorsByHouseId(this.selectedHouse)
      .then(response => {
        switch (response.status){
          case 200:
            for(var i = 0; i < response.json().resultLength; i++){
              this.sensors.unshift(new Sensor(response.json().result[i].sid, response.json().result[i].type, response.json().result[i].location, response.json().result[i].attributes));
            }
            break;
          case 204:
            this.sensors = [];
            break;
        }
      })
      .catch(error => {
        
      })
  }

  getSensorData(){
    this.records1 = [];
    this.records2 = [];
    this.functionCalled = false;
    document.getElementById("loader").className = "spinning visible";
    document.getElementById("compareArea").innerHTML = "";
    var d1 = new Date();
    var d2 = new Date();
    d1.setHours(d1.getHours() - 1);

    this._http.getSensorDataWithinTimeFrame(this.selectedSensor1.sid, d1.getTime(), d2.getTime())
    .then(result => {
      var w1;
      var w2;
      var w3;
      var w4;
      var w5;

      var workers = [w1, w2, w3, w4, w5];
      this.initWorkers(result, workers, this.records1)

    })
    .catch(error => {

    })

    this._http.getSensorDataWithinTimeFrame(this.selectedSensor2.sid, d1.getTime(), d2.getTime())
    .then(result => {
      var w1;
      var w2;
      var w3;
      var w4;
      var w5;

      var workers = [w1, w2, w3, w4, w5];
      this.initWorkers(result, workers, this.records2);
    })
    .catch(error => {

    })
  }

  onChangeHouse(house: string){
    var hid = house.substr(0, house.indexOf("--") - 1);
    this.selectedHouse = this.houses.find(x => x.hid === hid);
    this.getSensorsFromSelectedHouse();
  }

  setSelectedSensors(s1:string, s2:string){
    var sid1 = s1.substr(0, s1.indexOf("--") - 1);
    var sid2 = s2.substr(0, s2.indexOf("--") - 1);
    this.selectedSensor1 = this.sensors.find(x => x.sid === sid1);
    this.selectedSensor2 = this.sensors.find(x => x.sid === sid2);
    this.getSensorData();
  }

  initWorkers(result, workers, records){
    var length = result.json().result.length;
    var scope = this;
      var doneEvent = new CustomEvent('workerDone');
      document.addEventListener('workerDone', function(){
        workersDone++;
        if(workersDone === workers.length && !scope.functionCalled){
          scope.makeGraph();
          scope.functionCalled = true;
        }
      }, false);

      var workersDone = 0;
      for(var i = 0; i < workers.length; i++){
        workers[i] = new Worker("/app/workers/data_workers.js");
        workers[i].postMessage(result.json().result.slice(i * (length / workers.length), (i + 1) * (length / workers.length)));
        workers[i].onmessage = function(event){
          switch(event.data){
            case "Done":
              document.dispatchEvent(doneEvent);
              break;
            default:
              var record = event.data
              records.unshift(new Record(record.value, record.timestamp, record.sensorState, record.sensorBatteryLevel, record.unit));
              break;
          }
        }
      }
  }

  makeGraph(){
    var d1 = new Date();
    var d2 = new Date();
    d1.setMinutes(d1.getMinutes() - 2);
    var options = {
      start: d1.getTime(),
      end: d2.getTime(),
      legend: true
    }
    var sensor1Data = this._graphGenerator.generateGraphDataWithGroup(this.records1, this.selectedSensor1.sid + " -- " + this.selectedSensor1.location);
    var sensor2Data = this._graphGenerator.generateGraphDataWithGroup(this.records2, this.selectedSensor2.sid + " -- " + this.selectedSensor2.location);
    this.dataSet.add(sensor1Data);
    this.dataSet.add(sensor2Data);

    console.log(this.dataSet.length);

    var graph = new vis.Graph2d(document.getElementById("compareArea"), this.dataSet, options);
    document.getElementById("loader").className = 'spinning hidden';




    
  }
}
