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


  // Variable para controlar la visibilidad del modal
  isConfirmationModalVisible: boolean = false;

  // Variable para almacenar la reserva que se va a borrar
  bookingToDelete: number = 0;

  oClient: IClient = {} as IClient;
  id: number = 0;
  status: HttpErrorResponse | null = null;

  oBooking: IBooking = {} as IBooking;

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

  doRemoveBooking(id: number): void {
    
    this.bookingToDelete = id;
    this.oBookingsService.get(id).subscribe({
      next: (data: any) => {
        this.oBooking = data;
        console.log(this.oBooking);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
    
    // Muestra el modal de confirmación
    this.isConfirmationModalVisible = true;
  }

  confirmDelete(): void {
    this.isConfirmationModalVisible = false;

    this.oBookingsService.deleteOne(this.bookingToDelete).subscribe({
      next: (data: any) => {
        
        console.log(data);
        this.getBookings();
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  cancelDelete(): void {
    // Cierra el modal de confirmación sin realizar la eliminación
    this.isConfirmationModalVisible = false;
  }

}
