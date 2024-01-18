import { Component, OnInit } from '@angular/core';
import { API_URL } from '../../environment/environment';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { SessionService } from '../../services/session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IToken } from '../../interfaces/modelInterfaces';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { IClient, IClientPage } from '../../interfaces/modelInterfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,


  ],
})
export class LoginComponent implements OnInit {



  status: HttpErrorResponse | null = null;

  username: string = '';
  password: string = '';



  constructor(
    private oSessionService: SessionService,
    private oRouter: Router,

  ) { }



  ngOnInit() {
  }

  onSubmit() {

    this.oSessionService.login(this.username, this.password).subscribe({
      next: (data: string) => {
        this.oSessionService.setToken(data);
        console.log(data);
        //this.oSessionService.emit({ type: 'login' });
        this.oRouter.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });


  }
}
