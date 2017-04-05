import {Injectable} from '@angular/core';

@Injectable()
export class TokenManager {
    private tokenKey: string = "token";

    storeToken(token){
        localStorage.setItem(this.tokenKey, token);
    }

    retrieveToken(){
        let token: string = localStorage.getItem(this.tokenKey);
        if(!token)
            return '';
        return token;
    }
}
