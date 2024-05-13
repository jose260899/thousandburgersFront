import { Injectable } from '@angular/core';
import { API_URL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { IEmployee, IEmployeePage, IToken } from '../interfaces/modelInterfaces';
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

getAll(): Observable<IEmployee[]> {
  return this.oHttpClient.get<IEmployee[]>(this.sUrl + "/all");
}

getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IEmployeePage> {
  if (!size) size = 10;
  if (!page) page = 0;
  return this.oHttpClient.get<IEmployeePage>(this.sUrl + "/page?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
}

newOne(oEmployee: IEmployee): Observable<IEmployee> {
  return this.oHttpClient.post<IEmployee>(this.sUrl + "/create", oEmployee);
}

update(oEmployee: IEmployee): Observable<IEmployee> {
  console.log(oEmployee);
  return this.oHttpClient.put<IEmployee>(this.sUrl + "/update", oEmployee);
}

deleteById(id:number): Observable<IEmployee> {
  return this.oHttpClient.delete<IEmployee>(this.sUrl + "/" + id);
}

create(oEmployee: IEmployee): Observable<IEmployee> {
  return this.oHttpClient.post<IEmployee>(this.sUrl + "/create", oEmployee);
}



}
