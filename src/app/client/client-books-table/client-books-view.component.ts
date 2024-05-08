import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IBooking, IBookingPage, IClient, IOrder, IProduct } from '../../interfaces/modelInterfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { SessionService } from '../../services/session.service';
import { BooksService } from '../../services/books.service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TimeZoneService } from '../../services/time.zone.service';

import { PaginatorState } from 'primeng/paginator';
import { PaginatorModule } from 'primeng/paginator';
import { OrderLineService } from '../../services/order.line.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-client-books-view',
  templateUrl: './client-books-view.component.html',
  styleUrls: ['./client-books-view.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    PaginatorModule,

  ],
})
export class ClientBooksViewComponent implements OnInit {

  faTrash = faTrash;
  faEye = faEye;
  faPen = faPen;


  oPage: IBookingPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };



  // Variable para controlar la visibilidad del modal
  isConfirmationModalVisible: boolean = false;
  isEditActive: boolean = false;
  ticketModalVisible: boolean = false;

  dateToday:Date = new Date( Date.now()); // Formato yyyy-mm-dd

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


  //Para el ticket
  orders: IOrder[] = [];
  products: IProduct[] = [];
  price: number = 0;


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
    private oOrderService: OrderLineService,
    private oProductService: ProductService,

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
    this.getPage();
  }

  getPage(): void {
    this.oBookingsService.getPageByClient(this.id,this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IBookingPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        //console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
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
        this.getPage();
        //console.log('ID del usuario obtenido desde la sesión: ' + userId);
      } else {
        console.error('No se pudo obtener el ID del usuario desde la sesión.');
      }
    });

  }




  doRemoveBooking(id: number): void {
    this.isConfirmationModalVisible = true;

    this.bookingToDelete = id;
    this.oBookingsService.get(id).subscribe({
      next: (data: any) => {
        this.oBooking = data;
        //console.log(this.oBooking);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })

    // Muestra el modal de confirmación
  }

  

  getOrderByBooking(id: number): void {
    this.orders = [];
    this.products = [];
    this.price = 0;
    this.oOrderService.getByBooking(id).subscribe({
      next: (data: IOrder[]) => {
        this.orders = data;
        this.orders.forEach(order => {
          this.products.push(order.product);
          this.price += order.product.price;
        });
        this.ticketModalVisible = true;
        console.log(this.orders);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  confirmDelete(): void {
    this.isConfirmationModalVisible = false;

    this.oBookingsService.deleteOne(this.bookingToDelete).subscribe({
      next: (data: any) => {

        //console.log(data);
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
    this.ticketModalVisible = false;

  }

  confirmEditBooking() {
    // Muestra el modal de confirmación
    //console.log(this.bookingForm.value);
    this.onSubmit();
  }

  doEditBooking(id: number): void {
   
    this.bookingToEdit = id;
    this.oBookingsService.get(id).subscribe({
      next: (data: any) => {
        this.oBooking = data;
        this.initializeForm(this.oBooking);
        //console.log(this.oBooking);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
    this.isEditActive = true;

  }


  onSubmit() {
    //console.log(this.bookingForm.value);
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


}
