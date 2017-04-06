import { Component, OnInit } from '@angular/core';
import { TokenManager } from "app/services/token-manager.service";

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  constructor(private _tokenManager: TokenManager) { }

  ngOnInit() {
  }

}
