import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise'
import { Record } from "app/models/record.model";

var dateformat = require('dateformat');

@Injectable()
export class GraphGeneratorService {
	
	
	generateGraphData(records:Record[]){
		var hasValue = records[0].value ? true : false;
		var hasSensorState = records[0].sensorState ? true : false;

		var valueData = [];
		var sensorStateData = [];

		if(hasValue){
			for(var i = 0; i < records.length; i++){
				valueData.push({x: records[i].timeStamp, y: records[i].value});
			}
		}

		var unit = records[0].unit ? records[0].unit : undefined;

		return {valueData: valueData, unit: unit};
	}

	generateGraphDataWithGroup(records:Record[], group:string){
		var hasValue = records[0].value ? true : false;

		var valueData = [];

		if(hasValue){
			for(var i = 0; i < records.length; i++){
				valueData.push({x: records[i].timeStamp, y: records[i].value, group: group});
			}
		}

		return valueData;
	}
}