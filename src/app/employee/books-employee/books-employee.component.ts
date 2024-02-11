import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IBooking } from '../../interfaces/modelInterfaces';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books.service.service';
import { EmployeeService } from '../../services/employee.service';
import { SessionService } from '../../services/session.service';
import { TimeZoneService } from '../../services/time.zone.service';
import { ClientAjaxService } from '../../services/client.ajax.service';

@Component({
  selector: 'app-books-employee',
  templateUrl: './books-employee.component.html',
  styleUrls: ['./books-employee.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class BooksEmployeeComponent implements OnInit {

  status: HttpErrorResponse | null = null;
  booksForm!: FormGroup;
  oBook: IBooking = { employee: { username: "" } , time_zone : { hour:"" }, client:{username:""}} as IBooking;
  minDate?: string;  // Se utiliza el formato yyyy-mm-dd
  options: string[] = [];
  usernames: string[] = [];


  searchControl = new FormControl('');


  constructor(
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oEmploeeService: EmployeeService,
    private oClientService : ClientAjaxService,
    private oBookService: BooksService,
    private oSessionService: SessionService,
    private oTimeZoneService: TimeZoneService
  ) { 
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Formato yyyy-mm-dd
    this.initializeForm(this.oBook);
   }

  initializeForm(oBooks: IBooking) {
    this.booksForm = this.oFormBuilder.group({
      id: [oBooks.id],
      date: [oBooks.date, [Validators.required]],
      time_zone: this.oFormBuilder.group({
        hour: [oBooks.time_zone.hour, [Validators.required]],
      }),
      employee: this.oFormBuilder.group({
        username: [oBooks.employee.username, Validators.required],
      }),
      client: this.oFormBuilder.group({
        username: [oBooks.client.username, Validators.required],
      }),
    });
  }

  
  ngOnInit() {
    this.fetchOptions();
    this.fetchUsernames();
    this.initializeForm(this.oBook);
  }



  fetchOptions() {
    this.oTimeZoneService.getOptions().subscribe({
      next: (data: string[]) => {
        this.options = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    } 
    );
  }

  fetchUsernames() {
    this.oClientService.getUsernames().subscribe({
      next: (data: string[]) => {
        this.usernames = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    } 
    );
  }


  onSubmit() {
    console.log(this.booksForm.value);
    if (!this.booksForm.valid) {
      this.oBookService.newOneForEmployee(this.booksForm.value).subscribe({
        next: (data: IBooking) => {
          this.oBook = { "employee": {}, "time_zone":{}, "client":{} } as IBooking;
          this.initializeForm(this.oBook);
          this.oRouter.navigate(['/booksPlistEmployee']);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })
    }
   

  }

}
