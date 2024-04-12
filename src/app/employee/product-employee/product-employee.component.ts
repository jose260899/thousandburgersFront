import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/modelInterfaces';


@Component({
  selector: 'app-product-employee',
  templateUrl: './product-employee.component.html',
  styleUrls: ['./product-employee.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,

  ],
})
export class ProductEmployeeComponent implements OnInit {

  faRightFromBracket = faRightFromBracket;
  faUser = faUser;
  

  status: HttpErrorResponse | null = null;
  productForm!: FormGroup;

  oProduct: IProduct = { product_type: { name:"" } } as IProduct;

  constructor(
    private fb: FormBuilder,
    private oProductService: ProductService,
  ) { 
    /*
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      image: [''],
      product_type: this.fb.group({
        name: ['']
      })

      
    });
    */
   }

   initializeForm(oProduct: IProduct) {
    this.productForm = this.fb.group({
      name: [oProduct.name],
      description: [oProduct.description],
      price: [oProduct.price],
      image: [oProduct.image],
      product_type: this.fb.group({
        name: [oProduct.product_type.name]
      })
    });
  }



  

  ngOnInit() {
    this.initializeForm(this.oProduct);
  }

  
  onSubmit() {
    if (this.productForm.valid) {
      this.oProductService.create(this.productForm.value).subscribe({
        next: (data: IProduct) => {
          console.log(data);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      });
    }
  }

}
