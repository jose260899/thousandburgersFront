import { Component, OnInit } from '@angular/core';
import { API_URL } from '../../environment/environment';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { ClientAjaxService } from '../../services/client.ajax.service';
import { IClient, IEmployee, SessionEvent } from '../../interfaces/modelInterfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Renderer2, ElementRef } from '@angular/core';
import { SessionEmployeeService } from '../../services/session.employee.service';
import { EmployeeService } from '../../services/employee.service';
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule],

})
export class MenuBarComponent implements OnInit {

  sUrl: string = API_URL;
  username: string = '';
  oSessionClient: IClient | null = null;
  isLoggedIn: boolean = false;


  usernameEmployee: string = '';
  oSessionEmployee: IEmployee | null = null;
  isLoggedInEmployee: boolean = false;
  showModal: boolean = false;

  constructor(
    private router: Router,
    private oSessionService: SessionService,
    private oClientService: ClientAjaxService,

    private oSessionEmployeeService: SessionEmployeeService,
    private oEmployeeService: EmployeeService,


    private renderer: Renderer2,
    private el: ElementRef

  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.sUrl = ev.url;
      }
    });

    if (this.oSessionService.isSessionActive()) {
      this.oClientService.getByUsername(this.oSessionService.getUsername()).subscribe({
        next: (oClient: IClient) => {
          this.oSessionClient = oClient;
          this.username = this.oSessionService.getUsername();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    }
    if (this.oSessionEmployeeService.isSessionActive()){
      this.oEmployeeService.getByUsername(this.oSessionEmployeeService.getUsername()).subscribe({
        next: (oEmployee: IEmployee) => {
          this.oSessionEmployee = oEmployee;
          this.usernameEmployee = this.oSessionEmployeeService.getUsername();

        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    }else{
      this.username = "";
      this.usernameEmployee = "";
    }
  
      
    

  }

  toggleNavbar() {
    const navbarBurger = this.el.nativeElement.querySelector('.navbar-burger');
    const targetId = navbarBurger.getAttribute('data-target');
    const target = this.el.nativeElement.querySelector(`#${targetId}`);

    if (navbarBurger.classList.contains('is-active')) {
      this.renderer.removeClass(navbarBurger, 'is-active');
      this.renderer.removeClass(target, 'is-active');
    } else {
      this.renderer.addClass(navbarBurger, 'is-active');
      this.renderer.addClass(target, 'is-active');
    }
  }

  ngOnInit() {
    initFlowbite();

     this.oSessionService.on().subscribe({
      next: (data: SessionEvent) => {
        if (data.type == 'login') {
          this.username = this.oSessionService.getUsername();
          this.oClientService.getByUsername(this.oSessionService.getUsername()).subscribe({
            next: (oClient: IClient) => {
              this.oSessionClient = oClient;
              this.isLoggedIn = true;
            },

            error: (error: HttpErrorResponse) => {
              console.log(error);
            }
          });
        }
        if (data.type == 'logout') {
          this.username = "";
        }
      }
    });
      this.oSessionEmployeeService.on().subscribe({
        next: (data: SessionEvent) => {
          if (data.type == 'login') {
            this.usernameEmployee = this.oSessionEmployeeService.getUsername();
            this.oEmployeeService.getByUsername(this.oSessionEmployeeService.getUsername()).subscribe({
              next: (oEmployee: IEmployee) => {
                this.oSessionEmployee = oEmployee;
                this.isLoggedInEmployee = true;
              },

              error: (error: HttpErrorResponse) => {
                console.log(error);
              }
            });
          }
          if (data.type == 'logout') {
            this.usernameEmployee = "";
          }
        }
      }); 
    






  }





  doSessionUserView($event: Event) {
    if (this.oSessionClient) {

    }
    return false;
    //$event.preventDefault
  }


  // Función para cerrar sesión y modal
  logout() {
    this.showModal = true;
  }

  confirmLogout() {
    // Muestra el modal de confirmación
    this.showModal = false;
    this.oSessionService.logout();
    this.oSessionService.emit({ type: 'logout' });
    this.oSessionEmployeeService.logout();
    this.oSessionEmployeeService.emit({ type: 'logout' });
    this.router.navigate(['/home']);
  }

  cancelLogout() {
    this.showModal = false;
  }















}
