import { Component, Input, OnInit } from '@angular/core';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { config } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IClient } from '../../interfaces/modelInterfaces';
import { SessionService } from '../../services/session.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientPrintService } from '../../services/user.print.service';




@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
  ],



})
export class ClientDetailComponent implements OnInit {

  //@Input() id: number = 1;
  id: number = 1;
  oClient: IClient = {} as IClient;

  status: HttpErrorResponse | null = null;

  clientForm!: FormGroup;

  showModal: boolean = false;


  constructor(
    private oClientAjaxService: ClientAjaxService,
    private oSessionService: SessionService,
    private router: Router,
    private oFormBuilder: FormBuilder,
    private oClientPrintService: ClientPrintService,

  ) {

  }

  initializeForm(oClient: IClient) {
    this.clientForm = this.oFormBuilder.group({
      id: [oClient.id],
      name: [oClient.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      telephone: [oClient.telephone, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      birthDate: [oClient.birthDate, [Validators.required]],

    });
  }

  ngOnInit() {
    this.getUserId();
    this.initializeForm(this.oClient);

  }

  getUserId(): void {
    this.oSessionService.getUserId().subscribe((userId: number | null) => {
      if (userId !== null) {
        this.id = userId;
        this.getOne();
      } else {
        console.error('No se pudo obtener el ID del usuario desde la sesión.');
      }
    });


   

  }
  
  getOne(): void {
    this.oClientAjaxService.getOne(this.id).subscribe({
      next: (data: IClient) => {
        this.oClient = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })

  }


  edit() {
    // Muestra el modal de confirmación
    this.clientForm.setValue({
      id: this.oClient.id,
      name: this.oClient.name,
      telephone: this.oClient.telephone,
      birthDate: this.oClient.birthDate,
      // Otros campos del formulario
    });
    this.showModal = true;

    
  }
  
  confirmEdit() {
    // Cierra el modal de confirmación y realiza el logout
    this.showModal = false;
    this.onSubmit();
  }
  
  closeModal() {
    // Cierra el modal de confirmación sin realizar el logout
    this.showModal = false;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.clientForm.controls[controlName].hasError(errorName);
  }


  onSubmit() {
    if (this.clientForm.valid) {

      this.oClientAjaxService.updateForClients(this.clientForm.value).subscribe({
        next: (data: IClient) => {
          this.oClient = data;
          this.initializeForm(this.oClient);
          setTimeout(() => {
            this.router.navigate(['/clientDetails']);
          }, 500);

        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })
    }// else {
      //console.log("Error en el formulario");
    //}
 }

 onPrintUser = (id_client: number) => {
  this.oClientPrintService.printUser(id_client);
}

}
