import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { User } from "app/models/user.model";
import 'rxjs/add/operator/toPromise'
import { ConfigurationService } from "app/services/config.service";

@Injectable()
export class HttpService {
    private headers = new Headers(
        {
            "Content-type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
    private options = new RequestOptions({ headers: this.headers });
    private baseUrl: string = null;

    constructor(private _http: Http, private _config: ConfigurationService) {
        this.init();
    }

    init() {
        var scope = this;
        this._config.getKey("baseUrl")
            .then(result => { scope.baseUrl = result })
            .catch(error => { scope.baseUrl = null; });
    }

    register(user: User) {
        var body = JSON.stringify({ username: user.username, password: user.password, email: user.email });
        return this._http.post(this.baseUrl + "user/register", body, this.options).toPromise();
    }

    login(username: string, password: string) {
        var body = JSON.stringify({ username: username, password: password });
        return this._http.post(this.baseUrl + "user/login", body, this.options).toPromise();
    }

    requestHouses(token: string) {
        console.log(this.baseUrl);
    }
}