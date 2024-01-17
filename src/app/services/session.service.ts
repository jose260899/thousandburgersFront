import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { API_URL } from '../environment/environment';
import { ClientAjaxService } from './client.ajax.service';
import { IToken } from '../interfaces/modelInterfaces';
//import { IPrelogin, IToken, IUser, SessionEvent } from '../model/model.interfaces';
@Injectable(
  {
    providedIn: 'root'
  }
)
export class SessionService {

  sUrl: string = API_URL + "/session";

  //subjectSession = new Subject<SessionEvent>();


  constructor(
    private oHttpClient: HttpClient,
    private oClientAjaxService: ClientAjaxService,
  ) { }

  private parseJwt(token: string): IToken {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  login(sUsername: string, sPassword: string): Observable<string> {
    //const sUser: string = JSON.stringify({ username: sUsername, password: sPassword });
    return this.oHttpClient.post<string>(this.sUrl + "/login", { username: sUsername, password: sPassword });
  }

  setToken(sToken: string): void {
    localStorage.setItem('token', sToken);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isSessionActive(): Boolean {
    let strToken: string | null = localStorage.getItem('token');
    if (strToken) {
      let oDecodedToken: IToken = this.parseJwt(strToken);
      if (Date.now() >= oDecodedToken.exp * 1000) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

}
