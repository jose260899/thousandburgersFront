import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import { IClient, IBooking } from '../../interfaces/modelInterfaces';
import { BooksService } from '../../services/books.service.service';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { SessionService } from '../../services/session.service';
import { TimeZoneService } from '../../services/time.zone.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-books-table-employee',
  templateUrl: './books-table-employee.component.html',
  styleUrls: ['./books-table-employee.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
  ],
})
export class BooksTableEmployeeComponent implements OnInit {


  faTrash = faTrash;
  faEye = faEye;
  faPen = faPen;




    // Variable para controlar la visibilidad del modal
    isConfirmationModalVisible: boolean = false;
    isEditActive: boolean = false;
  
    dateToday:Date = new Date( Date.now()); // Formato yyyy-mm-dd
  
    // Variable para almacenar la reserva que se va a borrar
    bookingToDelete: number = 0;
    bookingToEdit: number = 0;


    oClient: IClient = {} as IClient;
    id: number = 0;
    status: HttpErrorResponse | null = null;
    oBooking: IBooking = { employee: { username: "" } , time_zone : { hour:"" }, client:{username:""}} as IBooking;

  
    bookings: IBooking[] = [];//for the table
  
  
    bookingForm!: FormGroup;//form for editing
    minDate?: string;  // Se utiliza el formato yyyy-mm-dd
    options: string[] = []; //hours
  

    constructor(
      private oClientAjaxService: ClientAjaxService,
      private oEmployeeAjaxService: EmployeeService,
      private oSessionService: SessionService,
      private oBookingsService: BooksService,
      private router: Router,
      private oFormBuilder: FormBuilder,
      private oTimeZoneService: TimeZoneService,
  
    ) {
      const today = new Date();
      this.minDate = today.toISOString().split('T')[0]; // Formato yyyy-mm-dd
    }


    initializeForm(oBooks: IBooking) {
      this.bookingForm = this.oFormBuilder.group({
        id: [oBooks.id],
        date: [oBooks.date, [Validators.required]],
        time_zone: this.oFormBuilder.group({
          hour: [oBooks.time_zone.hour, [Validators.required]],
        }),
        employee: this.oFormBuilder.group({
          username: [oBooks.employee.username, Validators.required],
        }),
        client: this.oFormBuilder.group({
          username: [oBooks.client.username, Validators.required],
        }),
      });
    }

  ngOnInit() {
    this.fetchOptions();
    this.getBookings();
    this.initializeForm(this.oBooking);
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

  

/*   getUserId(): void {
    this.oSessionService.getUserId().subscribe((userId: number | null) => {
      if (userId !== null) {
        this.id = userId;
        this.getBookings();
        console.log('ID del usuario obtenido desde la sesión: ' + userId);
      } else {
        console.error('No se pudo obtener el ID del usuario desde la sesión.');
      }
    });

  } */


  getBookings(): void {
    this.oBookingsService.getAll().subscribe({
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
