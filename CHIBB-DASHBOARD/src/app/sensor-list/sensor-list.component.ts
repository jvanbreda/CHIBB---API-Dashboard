import { Component, OnInit } from '@angular/core';
import { HttpService } from "app/services/http.service";
import { House } from "app/models/house.model";
import 'bootstrap';
import 'jquery';
import { Sensor } from "app/models/sensor.model";
import { HouseListComponent } from "app/house-list/house-list.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']

})
export class SensorListComponent implements OnInit {

  private sensors: Sensor[];
  private houses: House[];
  private selectedSensor: Sensor = {sid: "", type: "", location: "", attributes: []};

  private unitChecked:boolean = false;
  private valueChecked:boolean = false;

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {
    this.getSensors();
  }

  parseInput(house:string, sid:string, type:string, location:string,  checkboxes){
    var hid = house.substr(0, house.indexOf("--") - 1);
    var attributes = [];
    for(var i = 0; i < checkboxes.length; i++){
      if(checkboxes[i].checked){
        attributes.push(checkboxes[i].value);
      }
    }
    return {"hid": hid, "sid": sid, "type": type, "location": location, "attributes": attributes}
  }

  createSensor(house:string, sid:string, type:string, location:string, checkboxes, modal){
    this._http.createSensor(this.parseInput(house, sid, type, location, checkboxes))
      .then(response =>{
        switch (response.status){
          case 200:
            alert(response.json().result.error);
            break;
          case 201:
            modal.close();
            this.getSensors();
            break;
        }
      })
      .catch(error => {
        alert(error);
      })
  }

  getSensors(){
    this.sensors = [];
    this._http.getSensors()
      .then(response => {
        switch (response.status){
          case 200:
            for(var i = 0; i < response.json().resultLength; i++){
              this.sensors.push(new Sensor(response.json().result[i].sid, response.json().result[i].type, response.json().result[i].location, response.json().result[i].attributes));
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

  getHouses(){
    this.houses = [];
    this._http.getHouses()
      .then(response => {
        switch (response.status){
          case 200:
            for(var i = 0; i < response.json().resultLength; i++){
              this.houses.push(new House(response.json().result[i].hid, response.json().result[i].address));
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

  updateSensor(sensor:Sensor, newAttributes){
    var attributes = []
    for(var i = 0; i < newAttributes.length; i++){
      if(newAttributes[i].checked){
        attributes.push(newAttributes[i].value);
      }
    }

    this._http.updateSensor(sensor, attributes)
      .then(response => {
        this.getSensors();
      })
      .catch(error => {
        alert(error);
      })
  }

  deleteSensor(sensor:Sensor){
    this._http.deleteSensor(sensor)
      .then(response => {
        this.getSensors();
      })
      .catch(error => {
        alert(error);
      })
  }

  onSelectSensor(sensor:Sensor){
    this.selectedSensor = sensor;
  }

  goToSensorPage(){
    this._router.navigate(['/sensors', this.selectedSensor.sid]);
  }

}
