import {Component, HostListener, OnInit} from '@angular/core';
import {TerminalService} from '../terminal.service';
import {NavbarService} from '../navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showTerminal = false;
  isNavbarHidden = false;
  isNavbarMobile = false;
  isNavbarCollapsed = true;

  constructor(
    public terminalService: TerminalService,
    private navbarService: NavbarService
  ) { }

  ngOnInit() {
    this.isNavbarMobile = window.innerWidth <= 990;
  }

  toggleTerminal(event) {
    this.showTerminal = event;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isNavbarMobile = window.innerWidth <= 990;
  }

}
