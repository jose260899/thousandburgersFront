import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Asegúrate de importar FormsModule
import { SessionService } from '../../services/session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { CryptoService } from '../../services/crypto.service';
import { NgxCaptchaModule } from 'ngx-captcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxCaptchaModule,
    


  ],
})
export class LoginComponent implements OnInit {

  faRightFromBracket = faRightFromBracket;
  faUser = faUser;



  status: HttpErrorResponse | null = null;
  loginForm!: FormGroup;

  siteKey: string = "6LeNG28pAAAAAME8DQkGtLYbeBgl4XgTkJwMFbw1";





  constructor(
    private fb: FormBuilder,

    private oSessionService: SessionService,
    private oRouter: Router,
    private oClientService: ClientAjaxService,
    private oCryptoService: CryptoService


  ) {
    
  }

 
  initializeForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      captcha: ['', [Validators.required]]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }


  ngOnInit() {
    this.initializeForm();

  }

  onSubmit() {

    if (this.loginForm.valid) {

      this.oSessionService.login(this.loginForm.value.username, this.oCryptoService.getSHA256(this.loginForm.value.password)).subscribe({
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
