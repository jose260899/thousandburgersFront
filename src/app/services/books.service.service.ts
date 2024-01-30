import { Injectable } from '@angular/core';
import { API_URL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { IBooking } from '../interfaces/modelInterfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  sUrl: string = API_URL + "/booking";

  constructor(
    private oHttpClient: HttpClient

  ) { }

  newOne(oBooking: IBooking): Observable<IBooking> {
    console.log(oBooking);
    return this.oHttpClient.post<IBooking>(this.sUrl, oBooking);
  }

  getByClient(iIdClient: number): Observable<IBooking[]> {
    return this.oHttpClient.get<IBooking[]>(this.sUrl + "/" + iIdClient);
  }


}
