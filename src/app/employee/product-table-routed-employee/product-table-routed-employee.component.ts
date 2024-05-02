import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ConfirmationService } from 'primeng/api';
import { parse } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-product-table-routed-employee',
  templateUrl: './product-table-routed-employee.component.html',
  styleUrls: ['./product-table-routed-employee.component.css']
})
export class ProductTableRoutedEmployeeComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  id_product:number = 0;
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oProductService: ProductService,
    private oConfirmationService: ConfirmationService
  ) {
    this.id_product = parseInt(this.oActivatedRoute.snapshot.paramMap.get('id') ?? '0');
   }

  ngOnInit() {
  }

}
