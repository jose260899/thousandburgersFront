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


  newOneForClients(oClient: IClient): Observable<IClient> {
    return this.oHttpClient.post<IClient>(this.sUrl + "/forclients", oClient);
  }

  getByUsername(username: string): Observable<IClient> {
    return this.oHttpClient.get<IClient>(this.sUrl + "/byUsername/" + username);
  }
  
  getOne(id: number): Observable<IClient> {
    return this.oHttpClient.get<IClient>(this.sUrl + "/" + id);
  }

  updateForClients(oClient: IClient): Observable<IClient> {
    return this.oHttpClient.put<IClient>(this.sUrl + "/updateClient", oClient);
}


}
