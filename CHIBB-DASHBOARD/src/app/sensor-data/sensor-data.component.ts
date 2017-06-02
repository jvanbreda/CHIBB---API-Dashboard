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

  constructor(private _route: ActivatedRoute, private _http: HttpService, private graphGenerator: GraphGeneratorService, private screenManager: ScreenManagerService) { }

  ngOnInit() {
    this.subscription = this._route.params.subscribe(params => {
      this.sid = params['sid'] + "";
    })
  }
}