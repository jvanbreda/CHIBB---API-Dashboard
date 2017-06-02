import { Component, OnInit } from '@angular/core';
import { HttpService } from "app/services/http.service";
import { ActivatedRoute } from "@angular/router";

declare var vis: any;

@Component({
  selector: 'app-sensor-data-live',
  templateUrl: './sensor-data-live.component.html',
  styleUrls: ['./sensor-data-live.component.css']
})
export class SensorDataLiveComponent implements OnInit {
  private subscription: any;
  private sid: string;

  private liveValueChart;
  private liveValueData = [];
  private liveData;

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
    }, 1000);
  }

  initGraph(){
    var d1 = new Date();
    var d2 = new Date();
    
    d1.setSeconds(d1.getSeconds() - 30);
    d2.setSeconds(d2.getSeconds() + 30);
    this.startDate = d1.getTime();
    this.endDate = d2.getTime();

    this.liveData = new vis.DataSet();

    var valueChartArea = document.getElementById('valueChartLive');
    var options = {
      start: this.startDate,
      end: this.endDate
    }
    valueChartArea.innerHTML = "";
    this.liveValueChart = new vis.Graph2d(valueChartArea, this.liveData, options);
  }

  getNewestData(){
    var scope = this;
    this._http.getLatestSensorData(this.sid)
    .then(result => {
      scope.addDataToGraph(result);
    })
    .catch(error => {
      console.log(error);
    })
  }

  addDataToGraph(result){
    var record = result.json().result;
    this.liveData.add({
      x: record.timestamp,
      y: record.value
    })
    this.startDate += 1000;
    this.endDate += 1000
    this.liveValueChart.setWindow(this.startDate, this.endDate, {animation: true});
  }

}
