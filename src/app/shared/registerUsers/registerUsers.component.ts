import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClient, } from '../../interfaces/modelInterfaces';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-registerUsers',
  templateUrl: './registerUsers.component.html',
  styleUrls: ['./registerUsers.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],

})
export class RegisterUsersComponent implements OnInit {




  oClient: IClient = {} as IClient;
  status: HttpErrorResponse | null = null;
  clientForm!: FormGroup;


  usuarioCreado: boolean = false;
  mensajeUsuarioCreado: string = '';


  constructor(
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oClientService: ClientAjaxService,

  ) {
    this.initializeForm(this.oClient);

  }

  initializeForm(oClient: IClient) {
    this.clientForm = this.oFormBuilder.group({
      name: [oClient.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      telephone: [oClient.telephone, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      birthDate: [oClient.birthDate, [Validators.required]],
      email: [oClient.email, [Validators.required, Validators.email]],
      username: [oClient.username, [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: [oClient.password, [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],

    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.clientForm.valid) {

      this.oClientService.newOneForClients(this.clientForm.value).subscribe({
        next: (data: IClient) => {
          this.oClient = data;
          this.initializeForm(this.oClient);
          this.usuarioCreado = true;
          this.mensajeUsuarioCreado = 'Usuario creado exitosamente';
          setTimeout(() => {
            this.oRouter.navigate(['/login']);
          }, 1000);

        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })
    } else {
      console.log("Error en el formulario");
    }

  }




}
