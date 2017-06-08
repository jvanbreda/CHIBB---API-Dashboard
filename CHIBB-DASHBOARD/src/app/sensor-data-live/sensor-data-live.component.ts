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
  private sensorBatteryLevel: Number;

  private liveValueChart;
  private liveValueData = [];
  private liveValueDataSet;

  private startDate = 0;
  private endDate = 0;

  constructor(private _http: HttpService, private _route: ActivatedRoute) { }

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
      scope.addDataToBlocks(result);
    })
    .catch(error => {
      console.log(error);
    })
  }

  getSensorState(){
    var scope = this;
    this._http.getSensorState(this.sid)
    .then(result => {
      scope.sensorState = result.json().result.status;
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
    if(record.value){
      this.liveValueDataSet.add({
        x: record.timestamp,
        y: record.value
      })
    }
    this.liveValueChart.setWindow(this.startDate, this.endDate, {animation: true});
  }

  addDataToBlocks(result){

  }

}
