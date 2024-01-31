import { Component, OnInit } from '@angular/core';
import { API_URL } from '../../environment/environment';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Asegúrate de importar FormsModule
import { SessionService } from '../../services/session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IToken, SessionEvent } from '../../interfaces/modelInterfaces';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { IClient, IClientPage } from '../../interfaces/modelInterfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { CryptoService } from '../../services/crypto.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,

  ],
})
export class LoginComponent implements OnInit {

  faRightFromBracket = faRightFromBracket;
  status: HttpErrorResponse | null = null;
  loginForm!: FormGroup;



  usuarioCreado: boolean = false;
  mensajeUsuarioCreado: string = '';





  constructor(
    private fb: FormBuilder,

    private oSessionService: SessionService,
    private oRouter: Router,
    private oClientService: ClientAjaxService,
    private oCryptoService: CryptoService


  ) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }



  ngOnInit() {

   
  }

  onSubmit() {

    if (this.loginForm.valid) {
      
      this.oSessionService.login(this.loginForm.value.username ,this.oCryptoService.getSHA256(this.loginForm.value.password)).subscribe({
        next: (data: string) => {
          this.oSessionService.setToken(data);
          this.oSessionService.emit({ type: 'login' });
          this.usuarioCreado = true;
          this.mensajeUsuarioCreado = 'Logged in';
          setTimeout(() => {
            this.oRouter.navigate(['/home']);
          }, 500);

        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      });
    }


  }
}
