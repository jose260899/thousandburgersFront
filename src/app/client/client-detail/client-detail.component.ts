import { Component, Input, OnInit } from '@angular/core';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { config } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IClient } from '../../interfaces/modelInterfaces';
import { SessionService } from '../../services/session.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
  standalone: true,
  imports: [RouterModule],



})
export class ClientDetailComponent implements OnInit {

  //@Input() id: number = 1;
  id: number = 1;
  oClient: IClient = {} as IClient;

  status: HttpErrorResponse | null = null;



  constructor(
    private oClientAjaxService: ClientAjaxService,
    private oSessionService: SessionService,
  ) {

  }

  ngOnInit() {
    this.getUserId();
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
}
