import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableService } from '../../services/table.service';
import { IBooking, IBookingPage, IEntity, IOrder, IProduct, IProductType, ITable } from '../../interfaces/modelInterfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { ProductTypeService } from '../../services/product.type.service';
import { BooksService } from '../../services/books.service.service';
import { OrderLineService } from '../../services/order.line.service';

@Component({
  selector: 'app-tables-page-employee',
  templateUrl: './tables-page-employee.component.html',
  styleUrls: ['./tables-page-employee.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    PaginatorModule,

  ],
})
export class TablesPageEmployeeComponent implements OnInit {

  tables: ITable[] = [];
  booking: IBooking = {} as IBooking;
  products: IProduct[] = [];
  orders: IOrder[] = [];

  price: number = 0;
  uniqueProducts: { [name: string]: number } = {};


  status: HttpErrorResponse | null = null;

  //variables para el la ventana de pedir productos
  oProductType: IProductType = {} as IProductType;
  menuItems: IProductType[] = [];

  entrantes: IProduct[] = [];
  principales: IProduct[] = [];
  postres: IProduct[] = [];

  showModal: boolean = false;


  //Variables para asignar una mesa a una reserva
  id_table: number = 0;
  id_booking: number = 0;
  showModalReserve: boolean = false;

  oPage: IBookingPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };

  //variables para la ventana de pedir productos
  oOrder: IOrder = {} as IOrder;
  oProduct: IProduct = {} as IProduct;
  product_name: string[] = [];



  constructor(
    private oTableService: TableService,
    private oProductTypeService: ProductTypeService,
    private oProductService: ProductService,
    private oBookingService: BooksService,
    private oOrderService: OrderLineService
  ) { }

  ngOnInit() {
    this.getTables();
    this.cogerTypeProds();
    this.getBookings();
  }

  getBookings(): void {
    this.oBookingService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  getOrdersByBooking(id_booking: number): void {
    this.products = [];
    this.price = 0;
    this.oOrderService.getByBooking(id_booking).subscribe({
      next: (data: IOrder[]) => {
          this.orders = data;
          this.orders.forEach(order => {
            this.products.push(order.product);
            this.price += order.product.price;
          });
          console.log(this.products);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching data:', error);
      }
    });
  }


  openModalOrder(table_id:number): void {
    this.id_table = table_id;
    this.oBookingService.getBookingByTable(table_id).subscribe({
      next: (data: IBooking) => {
        this.booking = data;
        this.id_booking = this.booking.id;
        this.getOrdersByBooking(this.booking.id);
        //console.log(this.booking);
        this.showModal = true;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getBookings();

  }

  getTables(): void {
    this.oTableService.getOptions().subscribe({
      next: (data: ITable[]) => {
        this.tables = data;
        console.log(this.tables);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

  addOrderLine() {
    this.product_name.forEach(element => {
      console.log(element);
      console.log(this.id_booking);
       this.oOrderService.addOrderLine(this.id_booking, element).subscribe({
        next: (data) => {
          console.log(data);
          this.closeModal();
          this.getBookings();

        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      }); 
    }
    );
  }


  cogerTypeProds() {
    this.oProductTypeService.getAll().subscribe({
      next: (data) => {
        this.menuItems = data;
        this.cogerEntrantes();
        this.cogerPrincipales();
        this.cogerPostres();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  cogerEntrantes() {
    this.oProductService.getByClient(1).subscribe({
      next: (data) => {
        this.entrantes = data;
        console.log(this.entrantes);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  cogerPrincipales() {
    this.oProductService.getByClient(2).subscribe({
      next: (data) => {
        this.principales = data;
        console.log(this.principales);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  cogerPostres() {
    this.oProductService.getByClient(3).subscribe({
      next: (data) => {
        this.postres = data;
        console.log(this.postres);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }


  //funciones para la ventana de pedir productos
  openModal(id: number): void {
    //this.showModal = true;
    this.id_table = id;
    this.showModalReserve = true;
  }

  setBooking(id: number): void {
    this.id_booking = id;
    this.getBookings();
    this.updateBooking();
    this.getBookings();
  }

  setProductName(product_name: string): void {
    this.product_name.push(product_name);
    console.log(this.product_name);
  }

  removeProduct(productName: string) {
    const index = this.product_name.indexOf(productName);
    if (index !== -1) {
      this.product_name.splice(index, 1);
    }
  }

  updateBooking(): void {
    this.oBookingService.setTable(this.id_booking, this.id_table).subscribe({
      next: (data) => {
        console.log(data);
        this.getBookings();
        this.getTables();
        this.showModalReserve = false;
        //this.showModal = true
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.showModalReserve = false;
    this.product_name = [];

  }

  confirmOrder(): void {
    this.addOrderLine();
    //this.product_name = [];
    console.log(this.product_name);
  }


}
