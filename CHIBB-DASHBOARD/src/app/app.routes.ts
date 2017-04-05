import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "app/login/login.component";
import { RegisterComponent } from "app/register/register.component";
import { HomeComponent } from "app/home/home.component";
import { HouseComponent } from "app/house/house.component";
import { SensorComponent } from "app/sensor/sensor.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'houses', component: HouseComponent},
    {path: 'sensors', component: SensorComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);