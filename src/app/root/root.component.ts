import { Component, OnInit } from '@angular/core';
import {TerminalService} from '../terminal.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(
    private terminalService: TerminalService
  ) { }

  ngOnInit() {

  }

}
