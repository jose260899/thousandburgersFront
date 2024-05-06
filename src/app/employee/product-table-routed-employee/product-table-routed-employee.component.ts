import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ConfirmationService } from 'primeng/api';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { ProductTableUnroutedEmployeeComponent } from '../product-table-unrouted-employee/product-table-unrouted-employee.component';

@Component({
  selector: 'app-product-table-routed-employee',
  templateUrl: './product-table-routed-employee.component.html',
  styleUrls: ['./product-table-routed-employee.component.css'],
  standalone: true,
  imports: [
    ProductTableUnroutedEmployeeComponent,
    RouterModule,
  ]
})
export class ProductTableRoutedEmployeeComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  id_product_type:number = 0;
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
  ) {
    this.id_product_type = parseInt(this.oActivatedRoute.snapshot.paramMap.get('id') ?? '0');
   }

  ngOnInit() {
  }

}
