import { Component, OnInit } from '@angular/core';
import { TokenManager } from "app/services/token-manager.service";

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html'
})
export class NavHeaderComponent implements OnInit {

  constructor(private _tokenManager: TokenManager) { }

  ngOnInit() {
  }

  onLogout(){
    this._tokenManager.removeToken();
  }


}
