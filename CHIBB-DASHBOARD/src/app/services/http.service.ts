import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { User } from "app/models/user.model";
import 'rxjs/add/operator/toPromise'

@Injectable()
export class HttpService {
    private headers = new Headers(
            {
                "Content-type":  "application/json; charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            });
    private options = new RequestOptions({headers: this.headers});

    constructor(private _http: Http){ }

    register(user: User) {
        var body = JSON.stringify({ username: user.username, password: user.password, email: user.email });
        return this._http.post("http://localhost:8081/user/register", body, this.options).toPromise();      
    }

    login(username: string, password: string){
        var body = JSON.stringify({username: username, password: password});
        return this._http.post("http://localhost:8081/user/login", body, this.options).toPromise();
    }
}