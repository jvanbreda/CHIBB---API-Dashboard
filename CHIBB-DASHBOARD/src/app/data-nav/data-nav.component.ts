import { Component, OnInit } from '@angular/core';
import { ScreenManagerService } from "app/services/screen-manager.service";
import { ScreenStates } from "app/screenstates";

@Component({
  selector: 'app-data-nav',
  templateUrl: './data-nav.component.html'
})
export class DataNavComponent implements OnInit {

  private screenStates = ScreenStates;

  constructor(private screenManager: ScreenManagerService) { }

  ngOnInit() {
  }

}
