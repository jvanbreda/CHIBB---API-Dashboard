import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { User } from "app/models/user.model";
import 'rxjs/add/operator/toPromise'
import { ConfigurationService } from "app/services/config.service";
import { TokenManager } from "app/services/token-manager.service";
import { House } from "app/models/house.model";
import { Sensor } from "app/models/sensor.model";

@Injectable()
export class HttpService {
    private headers = new Headers(
        {
            "Content-type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
    private options = new RequestOptions({ headers: this.headers });
    private baseUrl: string = "";

    constructor(private _http: Http, private _config: ConfigurationService, private _tokenManager: TokenManager) {
        this.init();
    }

    init() {
        var scope = this;
        this._config.getKey("baseUrl")
            .then(result => { scope.baseUrl = result })
            .catch(error => { scope.baseUrl = null; });
    }

    register(user: User) {
        var url = this.baseUrl + "user/register"
        var body = JSON.stringify({ username: user.username, password: user.password, email: user.email });
        return this._http.post(url, body, this.options).toPromise();
    }

    login(username: string, password: string) {
        var url = this.baseUrl + "user/login"
        var body = JSON.stringify({ username: username, password: password });
        return this._http.post(url, body, this.options).toPromise();
    }

    createHouse(house:House){
        var url = this.baseUrl + "house?token=" + this._tokenManager.retrieveToken();
        var body = JSON.stringify({ hid: house.hid, address: house.address });
        return this._http.post(url, body, this.options).toPromise();
    }

    getHouses() {
        var url = this.baseUrl + "house?token=" + this._tokenManager.retrieveToken();
        return this._http.get(url, this.options).toPromise();
    }

    updateHouse(house:House, newAddress:string){
        var url = this.baseUrl + "house/" + house.hid + "/?token=" + this._tokenManager.retrieveToken();
        var body = JSON.stringify({ hid: house.hid, address: newAddress})
        return this._http.put(url, body, this.options).toPromise();
    }

    deleteHouse(house:House){
        var url = this.baseUrl + "house/" + house.hid + "/?token=" + this._tokenManager.retrieveToken();
        return this._http.delete(url, this.options).toPromise();
    }

    createSensor(sensorInfo){
        var url = this.baseUrl + "sensor?token=" + this._tokenManager.retrieveToken();
        var body = sensorInfo;
        return this._http.post(url, body, this.options).toPromise();
    }

    getSensors(){
        var url = this.baseUrl + "sensor?token=" + this._tokenManager.retrieveToken();
        return this._http.get(url, this.options).toPromise();
    }

    getSensorsByHouseId(house:House){
        var url = this.baseUrl + "sensor/house/" + house.hid + "/?token=" + this._tokenManager.retrieveToken();
        return this._http.get(url, this.options).toPromise();
    }

    updateSensor(sensor:Sensor, newAttributes:string[]){
        var url = this.baseUrl + "sensor/" + sensor.sid + "/?token=" + this._tokenManager.retrieveToken();
        var body = JSON.stringify({ sid: sensor.sid, type: sensor.type, attributes: newAttributes})
        return this._http.put(url, body, this.options).toPromise();
    }

    deleteSensor(sensor:Sensor){
        var url = this.baseUrl + "sensor/" + sensor.sid + "/?token=" + this._tokenManager.retrieveToken();
        return this._http.delete(url, this.options).toPromise();   
    }
}