import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenManager } from './token-manager.service';

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(private _tokenManager: TokenManager, private _router: Router) {}

  canActivate() {
    if(!this._tokenManager.isTokenSet()){
		this._router.navigate(['/login']);
		return false;
	}
	else 
		return true;
  }
}