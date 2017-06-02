import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise'
import { ScreenStates } from "app/screenstates";

@Injectable()
export class ScreenManagerService {
	private screenstate: ScreenStates = ScreenStates.HISTORICAL_DATA;

  	getScreenState(){
		return this.screenstate;
	}

	setScreenState(screenstate: ScreenStates){
		this.screenstate = screenstate;
	}
}