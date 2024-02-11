import { Injectable } from '@angular/core';
import { API_URL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { IEmployee, IToken } from '../interfaces/modelInterfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

sUrl: string = API_URL + "/employee";

constructor(
  private oHttpClient: HttpClient

) { }



getByUsername(username: string): Observable<IEmployee> {
  return this.oHttpClient.get<IEmployee>(this.sUrl + "/byUsername/" + username);
}

getOne(id: number): Observable<IEmployee> {
  return this.oHttpClient.get<IEmployee>(this.sUrl + "/" + id);
}

}
