import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './shared/menu-bar/menu-bar.component';
import { FormsModule } from '@angular/forms';
import { SessionService } from './services/session.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    MenuBarComponent,
    FormsModule,
  ],
  providers: [

    SessionService,
  ],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'thousandburgersFront';
}
