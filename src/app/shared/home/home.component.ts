import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { IClient, SessionEvent } from '../../interfaces/modelInterfaces';
import { API_URL } from '../../environment/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [RouterModule],
  
})
export class HomeComponent implements OnInit {


  sUrl: string = API_URL;
  username: string = '';
  oSessionClient: IClient | null = null;

  
  constructor(
    private router: Router,
    private oSessionService: SessionService,
    private oClientService: ClientAjaxService,
  ) { }

  ngOnInit() {
    
  }

}
