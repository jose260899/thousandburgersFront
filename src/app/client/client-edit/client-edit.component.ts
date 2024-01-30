import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css'],
  standalone: true,
  imports: [RouterModule],

})
export class ClientEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
