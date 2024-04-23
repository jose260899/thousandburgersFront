import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { RegisterUsersComponent } from './shared/registerUsers/registerUsers.component';
import { ClientBooksComponent } from './client/client-books/client-books.component';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { MenuThousandComponent } from './shared/menu-thousand/menu-thousand.component';
import { ClientBooksViewComponent } from './client/client-books-table/client-books-view.component';
import { LoginEmployeeComponent } from './employee/login-employee/login-employee.component';
import { BooksEmployeeComponent } from './employee/books-employee/books-employee.component';
import { ClientTableEmployeeComponent } from './employee/client-table-employee/client-table-employee.component';
import { BooksTableEmployeeComponent } from './employee/books-table-employee/books-table-employee.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { TablesPageEmployeeComponent } from './employee/tables-page-employee/tables-page-employee.component';
import { EmployeeTableEmployeeComponent } from './employee/employee-table-employee/employee-table-employee.component';
import { ProductEmployeeComponent } from './employee/product-employee/product-employee.component';
import { ConfirmAccountComponent } from './shared/confirm-account/confirm-account.component';


export const routes: Routes = [
    { path: 'home', component:HomeComponent },
    { path: '', component:HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registerUsers', component:RegisterUsersComponent },
    { path: 'books', component:ClientBooksComponent },
    { path: 'clientDetails', component:ClientDetailComponent},
    { path: 'menu', component:MenuThousandComponent},
    { path: 'booksView' , component:ClientBooksViewComponent },
    { path: 'loginEmployee' , component:LoginEmployeeComponent },
    { path: 'booksEmployee' , component:BooksEmployeeComponent},
    { path: 'clientsPlistEmployee', component:ClientTableEmployeeComponent },
    { path: 'booksPlistEmployee', component:BooksTableEmployeeComponent },
    { path: 'employeeDetails', component:EmployeeDetailsComponent },
    { path: 'tablesEmployee' ,component: TablesPageEmployeeComponent },
    { path: 'employeePlist' ,component: EmployeeTableEmployeeComponent },
    { path : 'productEmployee', component:ProductEmployeeComponent },
    { path: 'user/confirm-account', component: ConfirmAccountComponent },

];
