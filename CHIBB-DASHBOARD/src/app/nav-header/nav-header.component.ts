import { Component, OnInit } from '@angular/core';
import { TokenManager } from "app/services/token-manager.service";

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html'
})
export class NavHeaderComponent implements OnInit {
  private _token = '';

  constructor(private _tokenManager: TokenManager) { }

  ngOnInit() {
  }

}
