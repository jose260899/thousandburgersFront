import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IEmployee } from '../../interfaces/modelInterfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from '../../services/session.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class EmployeeDetailsComponent implements OnInit {

    //@Input() id: number = 1;
    id: number = 1;
    oEmployee: IEmployee = {} as IEmployee;
  
    status: HttpErrorResponse | null = null;
  
    employeeForm!: FormGroup;
  
    showModal: boolean = false;

  constructor(
    private oEmployeeAjaxService: EmployeeService,
    private oSessionService: SessionService,
    private router: Router,
    private oFormBuilder: FormBuilder,
  ) { }

  initializeForm(oEmployee: IEmployee) {
    this.employeeForm = this.oFormBuilder.group({
      id: [oEmployee.id],
      name: [oEmployee.name],
      telephone: [oEmployee.telephone],
      role: [oEmployee.role],
    });
  }

  ngOnInit() {
  }

}
