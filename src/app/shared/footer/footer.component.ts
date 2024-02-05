import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router,

  ) { }

  ngOnInit() {
  }

}
