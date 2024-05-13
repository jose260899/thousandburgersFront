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
  modalEdit: boolean = false;
  modalDelete: boolean = false;
  modalView: boolean = false;

  idDelete: number = 0;

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

  initializeFormEdit(oEmployee: IEmployee) {
    this.employeeForm = this.oFormBuilder.group({
      id: [oEmployee.id],
      name: [oEmployee.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      telephone: [oEmployee.telephone, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      birthDate: [oEmployee.birthDate, [Validators.required]],
      role: [oEmployee.role, [Validators.required]],
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

  edit(id: number) {
    this.initializeFormEdit(this.oEmployee);
    this.oEmployeeService.getOne(id).subscribe({
      next: (data: IEmployee) => {
        this.oEmployee = data;
        console.log(this.oEmployee);
        this.employeeForm.setValue({
          id: this.oEmployee,
          name: this.oEmployee.name,
          //dni: this.oEmployee.dni,
          telephone: this.oEmployee.telephone,
          birthDate: this.oEmployee.birthDate,
          role: this.oEmployee.role,
        });
        this.openModalEdit();
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })

  }

  onSubmitEdit() {
    console.log(this.employeeForm.value);
    if (this.employeeForm.valid) {
      this.oEmployeeService.update(this.employeeForm.value).subscribe({
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
  
  delete(id: number){
    this.modalDelete = true;
    this.idDelete = id;
  }

  confirmDelete() {
    this.oEmployeeService.deleteById(this.idDelete).subscribe({
      next: (data: IEmployee) => {
        this.oEmployee = data;
        this.getPage();
        this.closeModalCreate();
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

  openModalCreate() {
    this.modalCreate = true;
    this.oEmployee = {} as IEmployee;
    this.initializeFormCreate(this.oEmployee);
  }

  openModalEdit() {
    this.modalEdit = true;
    this.initializeFormEdit(this.oEmployee);
  }

  closeModalCreate() {
    this.modalCreate = false;
    this.modalEdit = false;
    this.modalDelete = false;
    this.modalView = false;
  }

  view(id: number) {
    this.oEmployeeService.getOne(id).subscribe({
      next: (data: IEmployee) => {
        this.oEmployee = data;
        this.modalView = true;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }
}
