import { Component, OnInit } from '@angular/core';
import { TokenManager } from "app/services/token-manager.service";

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  constructor(private _tokenManager: TokenManager) { }

  ngOnInit() {
  }

}
