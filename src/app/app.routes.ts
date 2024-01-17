import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
export const routes: Routes = [
    { path: 'login', component: LoginComponent },

];
