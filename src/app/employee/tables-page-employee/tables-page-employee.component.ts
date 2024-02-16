import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginatorModule } from 'primeng/paginator';
import { TableService } from '../../services/table.service';
import { IEntity, IProduct, IProductType, ITable } from '../../interfaces/modelInterfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { ProductTypeService } from '../../services/product.type.service';

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

  status: HttpErrorResponse | null = null;



  //variables para el la ventana de pedir productos
  oProductType: IProductType = {} as IProductType;
  menuItems: IProductType[] = [];

  entrantes: IProduct[] = [];
  principales: IProduct[] = [];
  postres: IProduct[] = [];

  showModal: boolean = false;



  constructor(
    private oTableService: TableService,
    private oProductTypeService: ProductTypeService,
    private oProductService: ProductService,
  ) { }

  ngOnInit() {
    this.getTables();
    this.cogerTypeProds();
  }

  getTables(): void{
    this.oTableService.getOptions().subscribe({
      next: (data: ITable[]) => {
        this.tables = data;
        console.log(this.tables);
      },
      error: (error:HttpErrorResponse) => {
        this.status = error;
      }
    });
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
    openModal(): void{
      this.showModal = true;
    }

    closeModal(): void{
      this.showModal = false;
    }

    confirmOrder(): void{
      
    }
  

}
