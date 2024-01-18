import { Component, OnInit } from '@angular/core';
import { API_URL } from '../../environment/environment';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
  standalone: true,
  
})
export class MenuBarComponent implements OnInit {

  sUrl: string = API_URL;
  constructor(
    private router: Router,
    //private oSessionService: SessionService,
  ) { }

  ngOnInit() {
  }

  
    redirectToLink(type: string): void {
      if (type === 'register') {
        this.router.navigate(['/registerUsers']); // Reemplaza '/signup' con la ruta real de registro
      } else if (type === 'login') {
        this.router.navigate(['/login']); // Reemplaza '/login' con la ruta real de inicio de sesión
      }
    }
    //this.router.navigate(["/login"]);
  

}
