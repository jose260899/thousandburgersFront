import { Injectable } from '@angular/core';
import { API_URL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../interfaces/modelInterfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderLineService {


  sUrl: string = API_URL + "/order";

constructor(
  private oHttpClient: HttpClient

) { }

addOrderLine(id_booking: number, product_name: string) {
  return this.oHttpClient.post<IOrder>(this.sUrl + "/create/"+ id_booking + "/" + product_name, null);
}

}
