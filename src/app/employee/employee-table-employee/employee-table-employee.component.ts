import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { IEmployee, IEmployeePage } from '../../interfaces/modelInterfaces';
import { EmployeeService } from '../../services/employee.service';
import { faTrash, faEye, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-table-employee',
  templateUrl: './employee-table-employee.component.html',
  styleUrls: ['./employee-table-employee.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    PaginatorModule,

  ],
})
export class EmployeeTableEmployeeComponent implements OnInit {
  faTrash = faTrash;
  faEye = faEye;
  faPen = faPen;


  status: HttpErrorResponse | null = null;

  employees: IEmployee[] = [];


  oPage: IEmployeePage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };




  constructor(
    private oEmployeeService: EmployeeService,
    private oFormBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oEmployeeService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IEmployeePage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(data);
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
