import {Component, OnInit} from '@angular/core';
import {TerminalService} from './terminal.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private terminalService: TerminalService) {

  }

  ngOnInit(): void {
    this.terminalService.getRootHint().subscribe((data: any) => {
      localStorage.setItem('root', data.hint);
    });

  }
}
