import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../../services/product.type.service';
import { IProduct, IProductType } from '../../interfaces/modelInterfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { config } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-menu-thousand',
  templateUrl: './menu-thousand.component.html',
  styleUrls: ['./menu-thousand.component.scss']
})
export class MenuThousandComponent implements OnInit {

  oProductType: IProductType = {} as IProductType;
  status: HttpErrorResponse | null = null;
  menuItems: IProductType[] = [];

  entrantes: IProduct[] = [];
  principales: IProduct[] = [];
  postres: IProduct[] = [];


  constructor(
    private oProductTypeService: ProductTypeService,
    private oProductService: ProductService,
  ) { }

  ngOnInit() {
    this.cogerTypeProds();
  }

  cogerTypeProds(){
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
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }




}


