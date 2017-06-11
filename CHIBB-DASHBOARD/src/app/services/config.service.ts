import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise'

// The @injectable decorator makes sure that this class is injectable in every other class where the 
// developer may need it. The class only needs to be defined in the constructor of the class where this
// service is needed, so no reference has to be created
@Injectable()
export class ConfigurationService {
  constructor(private http: Http) {
  }

  // Service to read a config file. For example, the url of the server may be stored in this config file
  // In this way, only the config file needs to be re-compiled instead of the whole HttpService class
  getKey(key: string): any {
    return this.http.get('/assets/config.json').toPromise()
    .then(result => { return result.json()[key] })
    .catch(error => { return error })
  }
}