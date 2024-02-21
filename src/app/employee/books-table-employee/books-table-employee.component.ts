import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import { IClient, IBooking, IBookingPage } from '../../interfaces/modelInterfaces';
import { BooksService } from '../../services/books.service.service';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { SessionService } from '../../services/session.service';
import { TimeZoneService } from '../../services/time.zone.service';
import { EmployeeService } from '../../services/employee.service';

import { PaginatorState } from 'primeng/paginator';
import { PaginatorModule } from 'primeng/paginator';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-books-table-employee',
  templateUrl: './books-table-employee.component.html',
  styleUrls: ['./books-table-employee.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    PaginatorModule,


  ],
})
export class BooksTableEmployeeComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  @Input() id_client: number = 0;

  faTrash = faTrash;
  faEye = faEye;
  faPen = faPen;

  // Variables para almacenar la paginacion
  oPage: IBookingPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };




  // Variable para controlar la visibilidad del modal
  isConfirmationModalVisible: boolean = false;
  isEditActive: boolean = false;

  dateToday: Date = new Date(Date.now()); // Formato yyyy-mm-dd

  // Variable para almacenar la reserva que se va a borrar
  bookingToDelete: number = 0;
  bookingToEdit: number = 0;


  oClient: IClient = {} as IClient;
  id: number = 0;
  status: HttpErrorResponse | null = null;
  oBooking: IBooking = { employee: { username: "" }, time_zone: { hour: "" }, client: { username: "" } } as IBooking;


  bookings: IBooking[] = [];//for the table


  bookingForm!: FormGroup;//form for editing
  minDate?: string;  // Se utiliza el formato yyyy-mm-dd
  options: string[] = []; //hours


  constructor(
    private oBookingsService: BooksService,
    private oFormBuilder: FormBuilder,
    private oTimeZoneService: TimeZoneService,
    private oClientService: ClientAjaxService,

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
    this.getPage();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
    this.fetchOptions();
    this.initializeForm(this.oBooking);
    //this.getPage();
  }

  getBookingsByClient(id_client:number) {
    this.id_client = id_client;
    this.oBookingsService.getPageByClient(this.id_client,this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IBookingPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
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


  getPage(): void {
    this.id_client = 0;
    this.oBookingsService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IBookingPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
        console.log(this.oPage.content)
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    if(this.id_client > 0){
      this.getBookingsByClient(this.id_client);
    }else{
      this.getPage();
    }
  }

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
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
        this.getPage();
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
        this.getPage();
        this.closeModal();
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }


  getClient(): void {
    this.oClientService.getOne(this.id_client).subscribe({
      next: (data: IClient) => {
        this.oClient = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });

  }
}
