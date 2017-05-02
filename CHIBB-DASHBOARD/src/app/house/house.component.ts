import { Component, OnInit } from '@angular/core';
import { TokenManager } from "app/services/token-manager.service";
import { HttpService } from "app/services/http.service";

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  constructor(private _tokenManager: TokenManager, private _http: HttpService) { }

  ngOnInit() {
    this._http.requestHouses("ee");
  }

}
