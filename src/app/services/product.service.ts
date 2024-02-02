import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../environment/environment';
import { IProduct } from '../interfaces/modelInterfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  sUrl: string = API_URL + "/product";


  constructor(
    private oHttpClient: HttpClient

  ) { }

  getByClient(idProductType: number): Observable<IProduct[]> {
    return this.oHttpClient.get<IProduct[]>(this.sUrl + "/product-type/" + idProductType);
  }
}
