import {Injectable} from '@angular/core';

@Injectable()
export class TokenManager {
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
