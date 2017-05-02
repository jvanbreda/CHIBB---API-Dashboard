import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ConfigurationService {
  constructor(private http: Http) {
  }

  getKey(key: string): any {
    return this.http.get('/app/config.json').toPromise()
    .then(result => { return result.json()[key] })
    .catch(error => { return error })
  }
}