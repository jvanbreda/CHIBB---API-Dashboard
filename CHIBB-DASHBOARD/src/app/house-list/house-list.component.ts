import { Component, OnInit, Injectable } from '@angular/core';
import { HttpService } from "app/services/http.service";
import { House } from "app/models/house.model";
import 'bootstrap';
import 'jquery';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']

})

export class HouseListComponent implements OnInit {

  private houses: House[];
  private selectedHouse: House = {hid: "", address: ""};

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.getHouses();
  }

  createHouse(newId, newAddress){
    this._http.createHouse(new House(newId, newAddress))
      .then(response =>{
        switch (response.status){
          case 200:
            alert(response.json().result);
            break;
          case 201:
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

  onSelectHouse(house:House){
    this.selectedHouse = house;
  }

}
