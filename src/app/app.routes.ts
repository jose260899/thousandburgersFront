import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { RegisterUsersComponent } from './shared/registerUsers/registerUsers.component';
import { ClientBooksComponent } from './client/client-books/client-books.component';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { MenuThousandComponent } from './shared/menu-thousand/menu-thousand.component';
import { ClientEditComponent } from './client/client-edit/client-edit.component';
import { ClientBooksViewComponent } from './client/client-books-table/client-books-view.component';


export const routes: Routes = [
    { path: 'home', component:HomeComponent },
    { path: '', component:HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registerUsers', component:RegisterUsersComponent },
    { path: 'books', component:ClientBooksComponent },
    { path: 'clientDetails', component:ClientDetailComponent},
    { path: 'menu', component:MenuThousandComponent},
    { path: 'clientEdit', component:ClientEditComponent },
    { path: 'booksView' , component:ClientBooksViewComponent },

];
