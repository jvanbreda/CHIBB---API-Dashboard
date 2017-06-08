import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Http } from "@angular/http";
import { HttpService } from "app/services/http.service";
import { Record } from "app/models/record.model";
import { GraphGeneratorService } from "app/services/graphgenerator.service";
import { ScreenManagerService } from "app/services/screen-manager.service";
import { ScreenStates } from "app/screenstates";
import { Sensor } from 'app/models/sensor.model';

declare var vis: any;

@Component({
  selector: 'app-sensor-data-history',
  templateUrl: './sensor-data-history.component.html',
  styleUrls: ['./sensor-data-history.component.css']
})
export class SensorDataHistoryComponent implements OnInit, OnDestroy {
  private sid: string;
  private subscription: any;

  private sensor:Sensor;

  private records: Record[] = [];

  private screenStates = ScreenStates;

  private valueData = [];
  private sensorStateData = [];
  private sensorBatteryLevelData = [];
  private unit: string;

  private valueChart;

  private start; 

  constructor(private _route: ActivatedRoute, private _http: HttpService, private graphGenerator: GraphGeneratorService, private screenManager: ScreenManagerService) { }

  ngOnInit() {
    this.subscription = this._route.params.subscribe(params => {
      this.sid = params['sid'] + "";
    })
    this.start = Date.now();
    this.getData();
  }

  getData() {
    document.getElementById("valueChartHistory").innerHTML = "";
    document.getElementById("loader").className = "spinning visible";
    var scope = this;
    var d1 = new Date();
    var d2 = new Date();
    d1.setHours(d1.getHours() - 1);

    this._http.getSensorDataWithinTimeFrame(this.sid, d1.getTime(), d2.getTime())
      .then(result => {
        console.log("Done requesting data " + (Date.now() - this.start))
        this.dataToArray(result);
      })
      .catch(error => {
        console.log(error);
      })
  }

  dataToArray(result){
    var length = result.json().result.length;
    var w1;
    var w2;
    var w3;
    var w4;
    var w5;

    var workers = [w1, w2, w3, w4, w5];

    if(typeof(Worker) !== undefined){
      this.initWorkers(result, workers);
    }
    else {
      alert("Your browser does not support workers. Therefore loading data will take longer...")
      for(var i = 0; i < length; i++){
        var record = result.json().result[i];
        this.records.unshift(new Record(record.value, record.timestamp, record.sensorState, record.sensorBatteryLevel, record.unit));
      }
    }
  }

  initWorkers(result, workers){
    var length = result.json().result.length;
    var scope = this;
      var doneEvent = new CustomEvent('workerDone');
      document.addEventListener('workerDone', function(){
        workersDone++;
        if(workersDone === workers.length){
          console.log("Done placing data in record array " +  (Date.now() - scope.start));
          scope.makeGraphs();
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
              scope.records.unshift(new Record(record.value, record.timestamp, record.sensorState, record.sensorBatteryLevel, record.unit));
              break;
          }
        }
      }
  }

  makeGraphs(){
    var d1 = new Date();
    var d2 = new Date();
    d1.setMinutes(d1.getMinutes() - 2);

    var fromTimestamp = d1.getTime();
    var toTimestamp = d2.getTime();

    var allData = this.graphGenerator.generateGraphData(this.records);

    this.valueData = allData.valueData;
    this.unit = allData.unit;

    console.log("Done formatting data " + (Date.now() - this.start));

    var valueArea = document.getElementById('valueChartHistory');

    var valueDataSet = new vis.DataSet(this.valueData);
    var sensorStateDataSet = new vis.DataSet(this.sensorStateData);

    console.log("Done making datasets " + (Date.now() - this.start))

    var options = {
      start: fromTimestamp,
      end: toTimestamp,
      height: 400,
      
    };

    
    this.valueChart = new vis.Graph2d(valueArea, valueDataSet, options);
    document.getElementById("loader").className = "spinning hidden"
    console.log("Done drawing charts " + (Date.now() - this.start));
  }

  setWindow(fromTimestamp, toTimestamp){
    this.valueChart.setWindow(fromTimestamp, toTimestamp, {animation: false});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}