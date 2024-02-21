import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { CryptoService } from '../../services/crypto.service';
import { SessionService } from '../../services/session.service';
import { SessionEmployeeService } from '../../services/session.employee.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-login-employee',
  templateUrl: './login-employee.component.html',
  styleUrls: ['./login-employee.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,

  ],
})
export class LoginEmployeeComponent implements OnInit {

  faRightFromBracket = faRightFromBracket;
  faUser = faUser;

  status: HttpErrorResponse | null = null;
  loginForm!: FormGroup;

  constructor(

    private fb: FormBuilder,

    private oSessionService: SessionEmployeeService,
    private oRouter: Router,
    private oEmployeeService: EmployeeService,
    private oCryptoService: CryptoService
  ) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
   }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {

    if (this.loginForm.valid) {
      this.oSessionService.login(this.loginForm.value.username,this.loginForm.value.password).subscribe({
        next: (data: string) => {
          this.oSessionService.setToken(data);
          this.oSessionService.emit({ type: 'login' });

          this.oRouter.navigate(['/home']);


        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      });
    }


  }

}
