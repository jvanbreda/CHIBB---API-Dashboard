import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { User } from "app/models/user.model";
import 'rxjs/add/operator/toPromise'

@Injectable()
export class HttpService {
    constructor(private _http: Http){ }

    register(user: User) {
        var json = JSON.stringify({ username: user.username, password: user.password, email: user.email });
        var headers = new Headers(
            {
                "Content-type":  "application/json; charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            });
        var options = new RequestOptions({ headers: headers })

        return this._http.post("http://localhost:8081/user/register", json, options).toPromise();      
    }
}