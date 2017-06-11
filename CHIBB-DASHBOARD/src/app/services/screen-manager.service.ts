import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise'
import { ScreenStates } from "app/screenstates";

// The @injectable decorator makes sure that this class is injectable in every other class where the 
// developer may need it. The class only needs to be defined in the constructor of the class where this
// service is needed, so no reference has to be created
@Injectable()
export class ScreenManagerService {
	private screenstate: ScreenStates = ScreenStates.HISTORICAL_DATA;

	// This service keeps track of the current page that has to be displayed on the sensor page.
	// When the user uses the secundary nav bar on the sensor page, the screenState changes and the
	// right component is loaded.

  	getScreenState(){
		return this.screenstate;
	}

	setScreenState(screenstate: ScreenStates){
		this.screenstate = screenstate;
	}
}