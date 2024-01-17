import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient, IClientPage } from '../interfaces/modelInterfaces';
import { API_URL } from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientAjaxService {


  sUrl: string = API_URL + "/client";

constructor(
  private oHttpClient: HttpClient
) { }

}
