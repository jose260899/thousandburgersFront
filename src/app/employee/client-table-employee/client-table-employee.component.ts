import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BooksService } from '../../services/books.service.service';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { EmployeeService } from '../../services/employee.service';
import { IClient, IClientPage, IEmployee } from '../../interfaces/modelInterfaces';
import { SessionEmployeeService } from '../../services/session.employee.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { faTrash, faEye, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client-table-employee',
  templateUrl: './client-table-employee.component.html',
  styleUrls: ['./client-table-employee.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    PaginatorModule,

  ],
})
export class ClientTableEmployeeComponent implements OnInit {

  faTrash = faTrash;
  faEye = faEye;
  faPen = faPen;

  status: HttpErrorResponse | null = null;

  clients: IClient[] = [];
  
  oPage: IClientPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };


  constructor(
    private oClientService : ClientAjaxService,
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oClientService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IClientPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }



}
