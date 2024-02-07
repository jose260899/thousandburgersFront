import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BooksService } from '../../services/books.service.service';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { EmployeeService } from '../../services/employee.service';
import { IClient, IEmployee } from '../../interfaces/modelInterfaces';
import { SessionEmployeeService } from '../../services/session.employee.service';

@Component({
  selector: 'app-client-table-employee',
  templateUrl: './client-table-employee.component.html',
  styleUrls: ['./client-table-employee.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class ClientTableEmployeeComponent implements OnInit {


  status: HttpErrorResponse | null = null;

  allClients: IClient[] = [];

  oEmployee: IEmployee =  {} as IEmployee;

  constructor(
    private oRouter: Router,
    private oEmploeeService: EmployeeService,
    private oClientService : ClientAjaxService,
    private oBookService: BooksService,
    private oSessionService: SessionEmployeeService,
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(){
    this.oSessionService.getSessionEmployee()?.subscribe(sessionEmployee => {

      this.oEmployee = sessionEmployee;
      console.log('Admin session:', sessionEmployee);
      if(sessionEmployee.role !== 'admin') {
        this.status = new HttpErrorResponse({status: 401, statusText: 'Unauthorized', url: this.oRouter.url});
        this.oRouter.navigate(['/loginEmployee']);
        
      } else {
        this.fetchAllClients();
        console.log('Admin session:', sessionEmployee);
        this.status = null;
      }
    });
  }

  fetchAllClients(){
    this.oClientService.getAll().subscribe({
      next: (data) => {
        this.allClients = data;
        //console.log('Data fetched:', this.allClients);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

}
