import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { User } from "app/models/user.model";
import { HttpService } from "app/services/http.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;
  private EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private _http: HttpService, private _router: Router, private _fb: FormBuilder) {
    
   }

  ngOnInit(): any {
    this.registerForm = this._fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      password:  [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      email:  [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(this.EMAIL_REGEX)])],
    });
  }

  onSubmit(value){
    var scope = this;
    this._http.register(new User(value.username, value.password, value.email))
      .then(response => {
        switch (response.status){
          case 200:
            alert("This name is already in use, pick another one please!");
            break;
          case 201:
            alert("Your account has been created, log in to use this dashboard!");
            scope._router.navigateByUrl('login');
            break;
          }
        
      })
      .catch(error => {
        console.log(error);
      });
  }

}
