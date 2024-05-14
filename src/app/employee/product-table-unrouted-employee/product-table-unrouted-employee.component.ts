import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  oProduct: IProduct = { product_type: { name:"" } } as IProduct;



  oPage: IProductPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };

  productForm!: FormGroup;
  oFile: File = new File([""], "default.txt", { type: "text/plain" });

  modalCreate: boolean = false;
  modalEdit: boolean = false;
  modalDelete: boolean = false;
  modalView: boolean = false;



  constructor(
    private oProductService: ProductService,
    private fb: FormBuilder,
    private oRouter: RouterModule,
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.id_product_type > 0) {
      this.getProductType();
    }
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }

  initializeForm(oProduct: IProduct) {
    this.productForm = this.fb.group({
      name: [oProduct.name, [Validators.required]],
      description: [oProduct.description,[Validators.required]],
      image: [''],
      price: [oProduct.price, [Validators.required]],
      product_type: this.fb.group({
        name: [oProduct.product_type.name, [Validators.required]]
      })
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.oFile = file;
    }
  }



  getPage(): void {
    this.oProductService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_product_type).subscribe({
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


  onSubmit() {
    if (this.productForm.valid) {
      if (this.oFile instanceof File) {
        this.oProductService.create(this.productForm.value, this.oFile).subscribe({
          next: (data: IProduct) => {
            this.getPage();
            this.closeModal();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        });
      }else{
        console.log('El parámetro "image" no es un objeto de tipo File');
      }
      
    }
  }

  openModalCreate() {
    this.initializeForm(this.oProduct);
    this.modalCreate = true;
  }

  closeModal(){
    this.modalCreate = false;
    this.modalEdit = false;
    this.modalDelete = false;
    this.modalView = false;
  }

  idDelete: number = 0;
  
  delete(id: number){
    this.modalDelete = true;
    this.idDelete = id;
  }

  confirmDelete() {
    this.oProductService.delete(this.idDelete).subscribe({
      next: (data: IProduct) => {
        this.oProduct = data;
        this.getPage();
        this.closeModal();
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

}
