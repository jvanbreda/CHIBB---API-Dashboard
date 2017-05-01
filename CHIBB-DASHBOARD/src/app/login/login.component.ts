import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { HttpService } from "app/services/http.service";
import { Router } from "@angular/router";
import { TokenManager } from "app/services/token-manager.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(private _http: HttpService, private _router: Router, private _tokenManager: TokenManager, private _fb: FormBuilder) { }

  ngOnInit(): any {
    this.loginForm = this._fb.group({
      username: [null, Validators.required],
      password:  [null, Validators.required]
    });
  }

  onSubmit(value) {
    this._http.login(value.username, value.password)
      .then(function (response) {
        this._tokenManager.storeToken(response.json().result.token);
        this._router.navigateByUrl('/houses');
      }.bind(this))
      .catch(function (error) {
        alert(error.json().message);
      })
  }

}
