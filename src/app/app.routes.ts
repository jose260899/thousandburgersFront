import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { RegisterUsersComponent } from './shared/registerUsers/registerUsers.component';
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component:HomeComponent },
    { path: 'registerUsers', component:RegisterUsersComponent },

];
