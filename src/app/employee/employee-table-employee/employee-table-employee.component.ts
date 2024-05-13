import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  employeeForm!: FormGroup;


  oPage: IEmployeePage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };

  oEmployee: IEmployee = {} as IEmployee; 
  modalCreate: boolean = false;


  constructor(
    private oEmployeeService: EmployeeService,
    private oFormBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getPage();
  }

  initializeFormCreate(oEmployee: IEmployee) {
    this.employeeForm = this.oFormBuilder.group({
      name: [oEmployee.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      dni: [oEmployee.dni, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      telephone: [oEmployee.telephone, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      birthDate: [oEmployee.birthDate, [Validators.required]],
      role: [oEmployee.role, [Validators.required]],
      username: [oEmployee.username, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
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

  onSubmitCreate() {
    console.log(this.employeeForm.value);
    if (this.employeeForm.valid) {
      this.oEmployeeService.create(this.employeeForm.value).subscribe({
        next: (data: IEmployee) => {
          this.getPage();
          this.closeModalCreate();
          
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })
    }
  }

  openModalCreate() {
    this.modalCreate = true;
    this.initializeFormCreate(this.oEmployee);
  }

  closeModalCreate() {
    this.modalCreate = false;
  }


}
