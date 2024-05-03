import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IProduct, IProductPage } from '../../interfaces/modelInterfaces';
import { ProductService } from '../../services/product.service';
import { faTrash, faEye, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-table-unrouted-employee',
  templateUrl: './product-table-unrouted-employee.component.html',
  styleUrls: ['./product-table-unrouted-employee.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    PaginatorModule,
  ]

})
export class ProductTableUnroutedEmployeeComponent implements OnInit {

  faTrash = faTrash;
  faEye = faEye;
  faPen = faPen;

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_product_type: number = 0;

  status: HttpErrorResponse | null = null;

  products: IProduct[] = [];


  oPage: IProductPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };




  constructor(
    private oProductService: ProductService,
    private oFormBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oProductService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IProductPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

  onPageChange(event: PaginatorState): void {
    this.oPaginatorState = event;
    this.getPage();
  }

  getProductType(): void {
    this.oProductService.getByProductType(this.id_product_type).subscribe({
      next: (data: IProduct[]) => {
        this.products = data;
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

}
