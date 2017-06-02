import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Http } from "@angular/http";
import { HttpService } from "app/services/http.service";
import { Record } from "app/models/Record.model";
import { GraphGeneratorService } from "app/services/graphgenerator.service";
import { ScreenManagerService } from "app/services/screen-manager.service";
import { ScreenStates } from "app/screenstates";

declare var vis: any;

@Component({
  selector: 'app-sensor-data-history',
  templateUrl: './sensor-data-history.component.html',
  styleUrls: ['./sensor-data-history.component.css']
})
export class SensorDataHistoryComponent implements OnInit, OnDestroy {
  private sid: string;
  private subscription: any;
  private date = Date;
  private number = Number;

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
    var scope = this;
    this._http.getSensorData(this.sid)
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
    if(typeof(Worker) !== undefined){
      var scope = this;
      w1 = new Worker("/app/workers/data_workers.js");
      w2 = new Worker("/app/workers/data_workers.js");
      w3 = new Worker("/app/workers/data_workers.js");
      w4 = new Worker("/app/workers/data_workers.js");
      w5 = new Worker("/app/workers/data_workers.js");

      w1.postMessage(result.json().result.slice(0, length / 5));
      w2.postMessage(result.json().result.slice(length / 5, 2 * (length / 5)));
      w3.postMessage(result.json().result.slice(2 * (length / 5), 3 * (length / 5)));
      w4.postMessage(result.json().result.slice(3 * (length / 5), 4 * (length / 5)));
      w5.postMessage(result.json().result.slice(4 * (length / 5), 5 * (length / 5)));

      var doneEvent = new CustomEvent('workerDone');
      var workersDone = 0;
      document.addEventListener('workerDone', function(){
        workersDone++;
        if(workersDone === 5){
          console.log("Done placing data in record array " +  (Date.now() - scope.start));

          scope.makeGraphs();
        }
      }, false);


      w1.onmessage = function(event){
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
      w2.onmessage = function(event){
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
      w3.onmessage = function(event){
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
      w4.onmessage = function(event){
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
      w5.onmessage = function(event){
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
    else {
      alert("Your browser does not support workers. Therefore loading data will take longer...")
      for(var i = 0; i < length; i++){
        var record = result.json().result[i];
        this.records.unshift(new Record(record.value, record.timestamp, record.sensorState, record.sensorBatteryLevel, record.unit));
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
    

    var valuleDataSet = new vis.DataSet(this.valueData);
    var sensorStateDataSet = new vis.DataSet(this.sensorStateData);

    console.log("Done making datasets " + (Date.now() - this.start))

    var options = {
      start: fromTimestamp,
      end: toTimestamp
    };
    valueArea.innerHTML = "";
    this.valueChart = new vis.Graph2d(valueArea, valuleDataSet, options);
    
    console.log("Done drawing charts " + (Date.now() - this.start));
  }

  setWindow(fromTimestamp, toTimestamp){
    this.valueChart.setWindow(fromTimestamp, toTimestamp, {animation: false});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}