import { Injectable } from '@angular/core';
import { API_URL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { IBooking, IBookingPage } from '../interfaces/modelInterfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  sUrl: string = API_URL + "/booking";

  constructor(
    private oHttpClient: HttpClient

  ) { }

  getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IBookingPage> {
    if (!size) size = 10;
    if (!page) page = 0;
    return this.oHttpClient.get<IBookingPage>(this.sUrl + "/page?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
  }

  getPageByCurrentDate(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IBookingPage> {
    if (!size) size = 10;
    if (!page) page = 0;
    return this.oHttpClient.get<IBookingPage>(this.sUrl + "/pageCurrentDate?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
  }

  getBookingByTable(table_id:number) : Observable<IBooking> {
    return this.oHttpClient.get<IBooking>(this.sUrl + "/getByTable/" + table_id);
  }

  newOne(oBooking: IBooking): Observable<IBooking> {
    console.log(oBooking);
    return this.oHttpClient.post<IBooking>(this.sUrl + "/client", oBooking);
  }

  newOneForEmployee(oBooking: IBooking): Observable<IBooking> {
    return this.oHttpClient.post<IBooking>(this.sUrl + "/employee", oBooking);
  }

  getPageByClient(iIdClient: number, size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IBookingPage> {
    if (!size) size = 10;
    if (!page) page = 0;
    return this.oHttpClient.get<IBookingPage>(this.sUrl + "/client/" + iIdClient + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);

  }

  getAll(): Observable<IBooking[]> {
    return this.oHttpClient.get<IBooking[]>(this.sUrl+ "/all");
  }

  deleteOne(iIdBooking: number): Observable<IBooking> {
    return this.oHttpClient.delete<IBooking>(this.sUrl + "/" + iIdBooking);
  }

  get(idBooking:number) : Observable<IBooking>{
    return this.oHttpClient.get<IBooking>(this.sUrl + "/" + idBooking);
  }

  updateOwnBooking(oBooking: IBooking): Observable<IBooking> {
    return this.oHttpClient.put<IBooking>(this.sUrl + "/updateBooking",oBooking);
  }

  updateBooking(oBooking: IBooking): Observable<IBooking> {
    return this.oHttpClient.put<IBooking>(this.sUrl + "/updateBookingAdmin",oBooking);
  }

  setTable(id_booking:number, id_table:number): Observable<IBooking> {
    return this.oHttpClient.put<IBooking>(this.sUrl + "/setTable/" + id_booking + "/" + id_table, null); 
  }

  endBooking(id_booking:number): Observable<IBooking> {
    return this.oHttpClient.put<IBooking>(this.sUrl + "/endBooking/" + id_booking, null);
  }


}
