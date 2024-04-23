import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { CryptoService } from '../../services/crypto.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css'],
  standalone: true
})
export class ConfirmAccountComponent implements OnInit {

  constructor(
    private oRouter: ActivatedRoute,
    private oClientAjaxService: ClientAjaxService,
    private oRouterNavigate: Router,
    private oCryptoService: CryptoService
 
  ) { }

  ngOnInit() {
  }


  confirmAccount(): void {
    // Obtener el token de la URL
    const token = this.oRouter.snapshot.queryParams['token'];
    //const password = this.oRouter.snapshot.queryParams['password'];

    if (token) {
      this.oClientAjaxService.confirmAccount(token).subscribe({
        next: (data:string) => {
          console.log('Cuenta confirmada correctamente', data);

          this.oRouterNavigate.navigate(['/home']);
        },
        error:(error:HttpErrorResponse) => {
          console.error('Error al confirmar la cuenta', error);
        }
    });
    } else {
      console.error('Token no encontrado en la URL');
    }
  }

}
