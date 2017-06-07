import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "app/login/login.component";
import { RegisterComponent } from "app/register/register.component";
import { HomeComponent } from "app/home/home.component";
import { HouseComponent } from "app/house/house.component";
import { SensorComponent } from "app/sensor/sensor.component";
import { SensorDataComponent } from "app/sensor-data/sensor-data.component";
import { LoginGuardService } from './services/login-guard.service';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'houses', component: HouseComponent, canActivate: [LoginGuardService]},
    {path: 'sensors', component: SensorComponent, canActivate: [LoginGuardService]},
    {path: 'sensors/:sid', component: SensorDataComponent, canActivate: [LoginGuardService]}
];

export const routing = RouterModule.forRoot(APP_ROUTES);