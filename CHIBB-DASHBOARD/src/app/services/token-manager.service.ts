import {Injectable} from '@angular/core';

// The @injectable decorator makes sure that this class is injectable in every other class where the 
// developer may need it. The class only needs to be defined in the constructor of the class where this
// service is needed, so no reference has to be created
@Injectable()
export class TokenManager {

    // This service is in charge of storing and retrieving the session token used for identifying the
    // current user.

    private tokenSet: boolean = false;
    private tokenKey: string = "token";

    storeToken(token){
        sessionStorage.setItem(this.tokenKey, token);
    }

    removeToken(){
        sessionStorage.removeItem(this.tokenKey);
    }

    isTokenSet(){
        let token = sessionStorage.getItem(this.tokenKey);
        if(!token)
            return false;
        return true;
    }

    retrieveToken(){
        let token: string = sessionStorage.getItem(this.tokenKey);
        if(!token)
            return '';
        return token;
    }
}
