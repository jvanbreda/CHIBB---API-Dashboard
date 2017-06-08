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
import { HouseListComponent } from './house-list/house-list.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { GraphGeneratorService } from "app/services/graphgenerator.service";
import { SensorDataComponent } from './sensor-data/sensor-data.component';
import { DataNavComponent } from './data-nav/data-nav.component';
import { ScreenManagerService } from "app/services/screen-manager.service";
import { SensorDataHistoryComponent } from './sensor-data-history/sensor-data-history.component';
import { SensorDataLiveComponent } from './sensor-data-live/sensor-data-live.component';
import { LoginGuardService } from './services/login-guard.service';
import { CompareComponent } from './compare/compare.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavHeaderComponent,
    HouseComponent,
    SensorComponent,
    HomeComponent,
    HouseListComponent,
    SensorListComponent,
    SensorDataComponent,
    DataNavComponent,
    SensorDataHistoryComponent,
    SensorDataLiveComponent,
    CompareComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    Ng2Bs3ModalModule
  ],
  providers: [
    TokenManager, 
    HttpService, 
    ConfigurationService, 
    GraphGeneratorService, 
    ScreenManagerService,
    LoginGuardService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
