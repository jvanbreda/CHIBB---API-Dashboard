import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
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

  constructor(private _http: HttpService, private _router: Router) {  }

  ngOnInit(): any {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(value){
    this._http.register(new User(value.username, value.password, value.email))
      .then(function(response){
        switch (response.status){
          case 200:
            alert("This name is already in use, pick another one please!");
            break;
          case 201:
            alert("Your account has been created, log in to use this dashboard!");
            this._router.navigate(['/login']);
            break;
          }
        
      }).catch(function(){
        
      });
  }

}
