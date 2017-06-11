import { Component, OnInit } from '@angular/core';
import { HttpService } from "app/services/http.service";
import { ActivatedRoute } from "@angular/router";
import { Sensor } from 'app/models/sensor.model';

declare var vis: any;

@Component({
  selector: 'app-sensor-data-live',
  templateUrl: './sensor-data-live.component.html',
  styleUrls: ['./sensor-data-live.component.css']
})
export class SensorDataLiveComponent implements OnInit {
  private subscription: any;
  private sid: string;
  private sensor: Sensor;
  private sensorState: string;
  private previousState: string;
  private sensorBatteryLevel: Number;

  private liveValueChart;
  private liveValueData = [];
  private liveValueDataSet;

  private startDate = 0;
  private endDate = 0;

  private counter = 0;

  private groupCounter = 0;
  private skip: boolean = false;

  constructor(private _http: HttpService, private _route: ActivatedRoute) { }

  // The id of the wanted sensor is a parameter of the url. With this piece of code the parameter 
  // can be retrieved
  ngOnInit() {
    var scope = this;
    this.initGraph();
    this.subscription = this._route.params.subscribe(params => {
      this.sid = params['sid'] + "";
    })
    setInterval(function(){
      scope.getNewestData();
      scope.getSensorState();
    }, 1000);
  }

  initGraph(){
    var d1 = new Date();
    var d2 = new Date();
    
    d1.setSeconds(d1.getSeconds() - 30);
    d2.setSeconds(d2.getSeconds() + 30);
    this.startDate = d1.getTime();
    this.endDate = d2.getTime();

    this.liveValueDataSet = new vis.DataSet();

    var valueChartArea = document.getElementById('valueChartLive');
    var options = {
      start: this.startDate,
      end: this.endDate,
      height: 400
    }
    valueChartArea.innerHTML = "";
    this.liveValueChart = new vis.Graph2d(valueChartArea, this.liveValueDataSet, options);
  }

  getNewestData(){
    var scope = this;
    this._http.getLatestSensorData(this.sid)
    .then(result => {
      scope.sensorBatteryLevel = result.json().result.sensorBatteryLevel;
      scope.addDataToGraph(result);
    })
    .catch(error => {
      console.log(error);
    })
  }

  getSensorState(){
    var scope = this;
    this._http.getSensorState(this.sid)
    .then(result => {
      if(scope.counter > 0){
        scope.previousState = scope.sensorState;
        scope.sensorState = result.json().result.status;
        scope.determineGroup();
      }
      else{
        scope.previousState = "";
        scope.sensorState = result.json().result.status;
      }
      scope.counter++;
    
    })
    .catch(error => {
      console.log(error);
    })
  }

  addDataToGraph(result){
    var d1 = new Date();
    var d2 = new Date();
    
    d1.setSeconds(d1.getSeconds() - 30);
    d2.setSeconds(d2.getSeconds() + 30);
    this.startDate = d1.getTime();
    this.endDate = d2.getTime();

    var record = result.json().result;
    if(record.value && !this.skip){
      this.liveValueDataSet.add({
        x: record.timestamp,
        y: record.value,
        group: this.groupCounter
      })
    }
    this.liveValueChart.setWindow(this.startDate, this.endDate, {animation: true});
  }

  // If a sensor is inactive for a number of seconds and then reboots, the following data will be 
  // placed in another group to make sure that the last point from the previous session will not
  // connect to the first point of the new session
  // The skip variable is used to make sure that the first point from the new session will not be 
  // placed in the old session. One point of data will be skipped to the old session will only
  // contain old data and the new session will only contain new data
  determineGroup(){
    console.log(this.skip);
    if((this.previousState === "Inactive" || this.previousState === "Intermittent failures") && this.sensorState === "Active"){
      this.skip = false;
      this.groupCounter++;
    }

    else if((this.previousState === "Inactive" || this.previousState === "Intermittent failures")){
      this.skip = true;
    }
  }

}
