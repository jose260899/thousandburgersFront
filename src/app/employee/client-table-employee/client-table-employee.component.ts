import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BooksService } from '../../services/books.service.service';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { EmployeeService } from '../../services/employee.service';
import { IClient, IClientPage, IEmployee } from '../../interfaces/modelInterfaces';
import { SessionEmployeeService } from '../../services/session.employee.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { faTrash, faEye, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client-table-employee',
  templateUrl: './client-table-employee.component.html',
  styleUrls: ['./client-table-employee.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    PaginatorModule,

  ],
})
export class ClientTableEmployeeComponent implements OnInit {

  faTrash = faTrash;
  faEye = faEye;
  faPen = faPen;

  status: HttpErrorResponse | null = null;

  clients: IClient[] = [];

  oPage: IClientPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };

  showModal: boolean = false;
  viewMode: boolean = false;

  showModalForm: boolean = false;
  oClient: IClient = {} as IClient;
  clientForm!: FormGroup;




  client: IClient | undefined;
  clientToDelete: number = 0;

  constructor(
    private oClientService: ClientAjaxService,
    private oFormBuilder: FormBuilder,
    private oSessionEmployeeService: SessionEmployeeService,
    private router: Router,
  ) {

    
  }

  initializeForm(oClient: IClient) {
    this.clientForm = this.oFormBuilder.group({
      id: [oClient.id],
      name: [oClient.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      telephone: [oClient.telephone, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      birthDate: [oClient.birthDate, [Validators.required]],
      verified: [oClient.verified, [Validators.required]],

    });
  }

  ngOnInit() {
    this.getPage();
    this.initializeForm(this.oClient);
  }

  getPage(): void {
    this.oClientService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IClientPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }


  view(id: number) {


    this.oClientService.getOne(id).subscribe({
      next: (data: IClient) => {
        this.client = data;
        console.log(this.client);
        this.viewMode = true;
        this.showModal = true;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

  edit(id:number) {
    // Muestra el modal de confirmación
    this.oClientService.getOne(id).subscribe({
      next: (data: IClient) => {
        this.client = data;
        console.log(this.client);
        this.clientForm.setValue({
          id: this.client.id,
          name: this.client.name,
          telephone: this.client.telephone,
          birthDate: this.client.birthDate,
          verified: this.client.verified,
          // Otros campos del formulario
        });
        this.showModalForm = true;
    

      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
    
    
  }

  delete(id: number) {
    this.clientToDelete = id;
    this.oClientService.getOne(id).subscribe({
      next: (data: IClient) => {
        this.client = data;
        this.showModal = true;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

  cancelDelete() {
    this.showModal = false;
    this.viewMode = false;
  }

  confirmDelete() {

    this.oClientService.deleteById(this.clientToDelete).subscribe({
      next: (data: IClient) => {
        this.getPage();
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

  confirmEdit() {
    // Cierra el modal de confirmación y realiza el logout
    this.showModalForm = false;
    this.onSubmit();
  }
  
  closeModal() {
    // Cierra el modal de confirmación sin realizar el logout
    this.showModalForm = false;
  }

  



  onSubmit() {
    // if (this.clientForm.valid) {
 
       this.oClientService.updateForAdmin(this.clientForm.value).subscribe({
         next: (data: IClient) => {
           this.oClient = data;
           this.initializeForm(this.oClient);
           this.getPage();
 
         },
         error: (error: HttpErrorResponse) => {
           this.status = error;
         }
       })
     }



}
