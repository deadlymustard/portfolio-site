import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showTerminal = false;

  constructor() { }

  ngOnInit() {
  }

  toggleTerminal(event) {
    this.showTerminal = event;
  }

}
