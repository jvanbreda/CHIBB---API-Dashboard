import {Injectable} from '@angular/core';

@Injectable()
export class TokenManager {
    public tokenSet: boolean = false;
    private tokenKey: string = "token";

    storeToken(token){
        sessionStorage.setItem(this.tokenKey, token);
        this.tokenSet = true;
    }

    removeToken(){
        sessionStorage.removeItem(this.tokenKey);
        this.tokenSet = false;
    }

    retrieveToken(){
        let token: string = sessionStorage.getItem(this.tokenKey);
        if(!token)
            return '';
        return token;
    }
}
