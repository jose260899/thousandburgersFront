import { Injectable } from '@angular/core';
import { API_URL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { IProductType } from '../interfaces/modelInterfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {


  sUrl: string = API_URL + "/product-type";

constructor(
  private oHttpClient: HttpClient
) { }

getAll(): Observable<string[]> {
  return this.oHttpClient.get<string[]>(this.sUrl + "/all");
}

}
