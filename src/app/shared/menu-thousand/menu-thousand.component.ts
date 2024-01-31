import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../../services/product.type.service';
import { SessionService } from '../../services/session.service';
import { IProductType } from '../../interfaces/modelInterfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { config } from 'rxjs';

@Component({
  selector: 'app-menu-thousand',
  templateUrl: './menu-thousand.component.html',
  styleUrls: ['./menu-thousand.component.scss']
})
export class MenuThousandComponent implements OnInit {

  oProductType: IProductType = {} as IProductType;
  status: HttpErrorResponse | null = null;
  menuItems: IProductType[] = [];


  constructor(
    private oProductTypeService: ProductTypeService,
    private oSessionService: SessionService,
  ) { }

  ngOnInit() {
    this.oProductTypeService.getAll().subscribe(
      (data) => {
        this.menuItems = data;
        console.log(this.menuItems);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  

}


