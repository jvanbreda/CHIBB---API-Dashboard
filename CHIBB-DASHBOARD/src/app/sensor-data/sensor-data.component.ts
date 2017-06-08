import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Http } from "@angular/http";
import { HttpService } from "app/services/http.service";
import { Record } from "app/models/Record.model";
import { GraphGeneratorService } from "app/services/graphgenerator.service";
import { ScreenManagerService } from "app/services/screen-manager.service";
import { ScreenStates } from "app/screenstates";
import { Sensor } from 'app/models/sensor.model';

declare var vis: any;

@Component({
  selector: 'app-sensor-data',
  templateUrl: './sensor-data.component.html',
  styleUrls: ['./sensor-data.component.css']
})
export class SensorDataComponent implements OnInit {
  private sid: string;
  private subscription: any;

  private records: Record[] = [];

  private screenStates = ScreenStates;

  private start; 
  private sensor: Sensor;

  constructor(private _route: ActivatedRoute, private screenManager: ScreenManagerService, private _http: HttpService) { }

  ngOnInit() {
    this.subscription = this._route.params.subscribe(params => {
      this.sid = params['sid'] + "";
    })
    this.getSensor();
  }

  getSensor(){
    this._http.getSensorById(this.sid)
    .then(result => {
      this.sensor = result.json().result[0];
    })
    .catch(error => {
      console.log(error);
    })
  }  
}