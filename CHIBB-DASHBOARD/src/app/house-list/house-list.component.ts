import { Component, OnInit, Injectable } from '@angular/core';
import { HttpService } from "app/services/http.service";
import { House } from "app/models/house.model";
import 'bootstrap';
import 'jquery';
import { Sensor } from "app/models/sensor.model";

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']

})

export class HouseListComponent implements OnInit {

  private houses: House[];
  private selectedHouse: House = {hid: "", address: ""};
  private houseSensors: Sensor[];

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.getHouses();
  }

  createHouse(newId, newAddress, modal){
    this._http.createHouse(new House(newId, newAddress))
      .then(response =>{
        switch (response.status){
          case 200:
            alert(response.json().result.error);
            break;
          case 201:
            modal.close();
            this.getHouses();
            break;
        }
      })
      .catch(error => {
        alert(error);
      })
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

  updateHouse(house:House, newAddress:string){
    this._http.updateHouse(house, newAddress)
      .then(response => {
        this.getHouses();
      })
      .catch(error => {
        alert(error);
      })
  }

  deleteHouse(house:House){
    this._http.deleteHouse(house)
      .then(response => {
        this.getHouses();
      })
      .catch(error => {
        alert(error);
      })
  }

  // Sets the house that is clicked to an object in typescript, so the selected house and its attributes
  // can easily be retrieved
  onSelectHouse(house:House){
    this.selectedHouse = house;
  }

  getSensorsFromSelectedHouse(){
    this.houseSensors = [];
    this._http.getSensorsByHouseId(this.selectedHouse)
      .then(response => {
        switch (response.status){
          case 200:
            for(var i = 0; i < response.json().resultLength; i++){
              this.houseSensors.unshift(new Sensor(response.json().result[i].sid, response.json().result[i].type, response.json().result[i].location, response.json().result[i].attributes));
            }
            break;
          case 204:
            this.houses = [];
            break;
        }
      })
      .catch(error => {
        alert(error);
      });
  }

}
