import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../../services/product.type.service';
import { SessionService } from '../../services/session.service';
import { IProductType } from '../../interfaces/modelInterfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { config } from 'rxjs';

@Component({
  selector: 'app-menu-thousand',
  templateUrl: './menu-thousand.component.html',
  styleUrls: ['./menu-thousand.component.css']
})
export class MenuThousandComponent implements OnInit {

  oProductType: IProductType = {} as IProductType;
  status: HttpErrorResponse | null = null;
  options: string[] = [];


  constructor(
    private oProductTypeService: ProductTypeService,
    private oSessionService: SessionService,
  ) { }

  ngOnInit() {
    this.fetchOptions();
  }


  fetchOptions() {
    this.oProductTypeService.getAll().subscribe({
      next: (data: string[]) => {
        this.options = data;
        console.log(this.options);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    }

    );
  }

}


