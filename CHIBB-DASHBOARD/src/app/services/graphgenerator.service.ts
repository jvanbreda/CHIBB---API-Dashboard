import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise'
import { Record } from "app/models/record.model";

// The @injectable decorator makes sure that this class is injectable in every other class where the 
// developer may need it. The class only needs to be defined in the constructor of the class where this
// service is needed, so no reference has to be created
@Injectable()
export class GraphGeneratorService {
	
	// This service will transform an array of Records to an array of objects, which is readable
	// for vis.js and can be transformed to a graph.
	
	generateGraphData(records:Record[]){
		var hasValue = records[0].value ? true : false;

		var valueData = [];

		if(hasValue){
			for(var i = 0; i < records.length; i++){
				valueData.push({x: records[i].timeStamp, y: records[i].value});
			}
		}

		var unit = records[0].unit ? records[0].unit : undefined;

		return {valueData: valueData, unit: unit};
	}

	generateGraphDataWithGroup(records:Record[], group:number){
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