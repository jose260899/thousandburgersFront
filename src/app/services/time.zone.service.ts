import { Injectable } from '@angular/core';
import { API_URL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeZoneService {
  sUrl: string = API_URL + "/time-zone";

  constructor(
    private oHttpClient: HttpClient
  ) { }

  getOptions(): Observable<string[]> { 
    return this.oHttpClient.get<string[]>(this.sUrl + "/all");
  }

}
