import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../environment/environment';
import { Observable } from 'rxjs';
import { ITable } from '../interfaces/modelInterfaces';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  sUrl: string = API_URL + "/table";


constructor(
  private oHttpClient: HttpClient

) { }


getOptions(): Observable<ITable[]> { 
  return this.oHttpClient.get<ITable[]>(this.sUrl + "/all");
}

}
