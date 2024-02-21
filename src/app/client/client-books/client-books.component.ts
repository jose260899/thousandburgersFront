import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { BooksService } from '../../services/books.service.service';
import { IBooking, IClient, ITime } from '../../interfaces/modelInterfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from '../../services/session.service';
import { TimeZoneService } from '../../services/time.zone.service';

@Component({
  selector: 'app-client-books',
  templateUrl: './client-books.component.html',
  styleUrls: ['./client-books.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
})
export class ClientBooksComponent implements OnInit {

  status: HttpErrorResponse | null = null;
  booksForm!: FormGroup;
  oBook: IBooking = { client: { username: "" } , time_zone : { hour:"" }} as IBooking;
  minDate?: string;  // Se utiliza el formato yyyy-mm-dd
  options: string[] = [];



  constructor(
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oBookService: BooksService,
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
      client: this.oFormBuilder.group({
        username: [oBooks.client.username, Validators.required],
      }),
    });
  }

  ngOnInit() {
    this.fetchOptions();
    this.initializeForm(this.oBook);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.booksForm.controls[controlName].hasError(errorName);
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

  onSubmit() {
    if (!this.booksForm.valid) {
      this.oBookService.newOne(this.booksForm.value).subscribe({
        next: (data: IBooking) => {
          this.oBook = { "client": {}, "time_zone":{} } as IBooking;
          this.initializeForm(this.oBook);
          this.oRouter.navigate(['/booksView']);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })
    }
   

  }

}
