import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IBooking, IClient } from '../../interfaces/modelInterfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { SessionService } from '../../services/session.service';
import { BooksService } from '../../services/books.service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client-books-view',
  templateUrl: './client-books-view.component.html',
  styleUrls: ['./client-books-view.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
  ],
})
export class ClientBooksViewComponent implements OnInit {

  faTrash = faTrash;
  faEye = faEye;

  oClient: IClient = {} as IClient;
  id: number = 0;
  status: HttpErrorResponse | null = null;

  bookings: IBooking[] = [];
  
  constructor(
    private oClientAjaxService: ClientAjaxService,
    private oSessionService: SessionService,
    private oBookingsService: BooksService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUserId();
    
  }

  getUserId(): void {
    this.oSessionService.getUserId().subscribe((userId: number | null) => {
      if (userId !== null) {
        this.id = userId;
        this.getBookings();
        console.log('ID del usuario obtenido desde la sesión: ' + userId);
      } else {
        console.error('No se pudo obtener el ID del usuario desde la sesión.');
      }
    });

  }



  getBookings(): void {
    this.oBookingsService.getByClient(this.id).subscribe({
      next: (data: any) => {
        //console.log(data);
        this.bookings = data;
        console.log(this.bookings);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }
}
