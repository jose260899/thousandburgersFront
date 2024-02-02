import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IBooking, IClient } from '../../interfaces/modelInterfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { SessionService } from '../../services/session.service';
import { BooksService } from '../../services/books.service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TimeZoneService } from '../../services/time.zone.service';

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
  faPen = faPen;


  // Variable para controlar la visibilidad del modal
  isConfirmationModalVisible: boolean = false;
  isEditActive: boolean = false;

  dateToday = new Date(); // Formato yyyy-mm-dd

  // Variable para almacenar la reserva que se va a borrar
  bookingToDelete: number = 0;
  bookingToEdit: number = 0;

  oClient: IClient = {} as IClient;
  id: number = 0;
  status: HttpErrorResponse | null = null;
  oBooking: IBooking = {
    client: {
      username: ""
    },
    time_zone: {
      hour: ""
    }
  } as IBooking;

  bookings: IBooking[] = [];//for the table


  bookingForm!: FormGroup;//form for editing
  minDate?: string;  // Se utiliza el formato yyyy-mm-dd
  options: string[] = []; //hours


  constructor(
    private oClientAjaxService: ClientAjaxService,
    private oSessionService: SessionService,
    private oBookingsService: BooksService,
    private router: Router,
    private oFormBuilder: FormBuilder,
    private oTimeZoneService: TimeZoneService,

  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Formato yyyy-mm-dd
  }


  initializeForm(oBooking: IBooking) {
    this.bookingForm = this.oFormBuilder.group({
      id: [oBooking.id],
      date: [oBooking.date, [Validators.required]],
      time_zone: this.oFormBuilder.group({
        hour: [oBooking.time_zone.hour, [Validators.required]],
      }),
      client: this.oFormBuilder.group({
        username: [oBooking.client.username, Validators.required],
      })

    });
  }

  ngOnInit() {
    this.getUserId();
    this.fetchOptions();
    this.initializeForm(this.oBooking);
    console.log(this.dateToday);
  }

  fetchOptions() {
    this.oTimeZoneService.getOptions().subscribe({
      next: (data: string[]) => {
        this.options = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    }

    );
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








  closeModal() {
    // Cierra el modal de confirmación sin realizar el logout
    this.isEditActive = false;

  }

  confirmEditBooking() {
    // Muestra el modal de confirmación
    console.log(this.bookingForm.value);
  }

  doEditBooking(id: number): void {
   
    this.bookingToEdit = id;
    this.oBookingsService.get(id).subscribe({
      next: (data: any) => {
        this.oBooking = data;
        this.initializeForm(this.oBooking);
        console.log(this.oBooking);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
    this.isEditActive = true;

  }


  onSubmit() {
    console.log(this.bookingForm.value);
    this.oBookingsService.updateOwnBooking(this.bookingForm.value).subscribe({
      next: (data: IBooking) => {
        this.oBooking = data;
        this.initializeForm(this.oBooking);
        this.getBookings();
        this.closeModal();
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }


}
