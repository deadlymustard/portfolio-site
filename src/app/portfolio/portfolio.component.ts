import { Component, OnInit } from '@angular/core';
import {TerminalService} from '../terminal.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  constructor(public terminalService: TerminalService) { }

  ngOnInit() {
  }

}
