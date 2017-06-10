import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/services/http.service';
import { Sensor } from 'app/models/sensor.model';
import { House } from 'app/models/house.model';
import { Record } from 'app/models/record.model';
import { GraphGeneratorService } from 'app/services/graphgenerator.service';
import { PearsonCalculator } from '../pearsonCalculator';

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

  private similarity: number;
  private description: string;

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
    this.dataSet = new vis.DataSet();
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
      if(result.json().result.length)
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
      if(result.json().result.length > 0)
        this.initWorkers(result, workers, this.records2);
    })
    .catch(error => {
      console.log(error);
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
        workers[i] = new Worker("/assets/workers/data_workers.js");
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

    var groups = new vis.DataSet();
    groups.add({
      id: 1,
      content: this.selectedSensor1.type + " -- " + this.selectedSensor1.location
    })
    groups.add({
      id: 2,
      content: this.selectedSensor2.type + " -- " + this.selectedSensor2.location
    })

    var sensor1Data = this._graphGenerator.generateGraphDataWithGroup(this.records1, 1);
    var sensor2Data = this._graphGenerator.generateGraphDataWithGroup(this.records2, 2);

    this.similarity = PearsonCalculator.calculateSimilarity(sensor1Data, sensor2Data);
    this.description = this.getDescription();
    
    this.dataSet.add(sensor1Data);
    this.dataSet.add(sensor2Data);
    
    var graph = new vis.Graph2d(document.getElementById("compareArea"), this.dataSet, options);
    graph.setGroups(groups);
    document.getElementById("loader").className = 'spinning hidden';    
  }

  getDescription(){
    if(this.similarity >= -1 && this.similarity < -0.5)
      return "The sensors have a negative correlation with one another. That is, if the first sensor value increases, the second decreased and vice versa.";

    else if(this.similarity >= -0.5 && this.similarity < 0.5)
      return "The sensors do not have a strong correlation with one another. There is no real relationship between the two sensors";
    
    else if(this.similarity >= 0.5 && this.similarity <= 1){
      return "The sensors have a positive correlation with one another. That is, if the first sensor value increases, the second increases as well and vice versa."
    } 
  }
}
