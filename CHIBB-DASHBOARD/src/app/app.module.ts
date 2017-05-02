import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { HouseComponent } from './house/house.component';
import { SensorComponent } from './sensor/sensor.component';
import { HomeComponent } from './home/home.component';
import { routing } from "app/app.routes";
import { TokenManager } from "app/services/token-manager.service";
import { HttpService } from "app/services/http.service";
import { ConfigurationService } from "app/services/config.service";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavHeaderComponent,
    HouseComponent,
    SensorComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [TokenManager, HttpService, ConfigurationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
