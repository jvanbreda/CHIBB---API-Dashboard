import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenManager } from './token-manager.service';

// The @injectable decorator makes sure that this class is injectable in every other class where the 
// developer may need it. The class only needs to be defined in the constructor of the class where this
// service is needed, so no reference has to be created
@Injectable()
export class LoginGuardService implements CanActivate {

	// This service makes sure that users cannot access pages they are not authorized to see.

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