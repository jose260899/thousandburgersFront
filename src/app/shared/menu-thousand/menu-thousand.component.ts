import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../../services/product.type.service';
import { SessionService } from '../../services/session.service';
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

  products: IProduct[] = [];

  constructor(
    private oProductTypeService: ProductTypeService,
    private oSessionService: SessionService,
    private oProductService: ProductService,
  ) { }

  ngOnInit() {
    this.cogerTypeProds();
  }

  cogerTypeProds(){
    this.oProductTypeService.getAll().subscribe({
      next: (data) => {
        this.menuItems = data;
        console.log(this.menuItems);
        console.log("-----------------------------");
        this.recorrer();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  recorrer(){
    this.menuItems.forEach((menuItem) => {
      this.cogerProductos(menuItem.id); // Assuming there is an 'id' property in menuItem
    });
  }

  cogerProductos(idProductType: number) {
    this.oProductService.getByClient(idProductType).subscribe({
      next: (data) => {
        this.products = data;
        console.log(this.products);

      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }




}


