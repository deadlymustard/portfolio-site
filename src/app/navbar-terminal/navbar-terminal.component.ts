import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { terminal } from '../../data/terminal';


@Component({
  selector: 'app-navbar-terminal',
  templateUrl: './navbar-terminal.component.html',
  styleUrls: ['./navbar-terminal.component.scss']
})
export class NavbarTerminalComponent implements OnInit {

  constructor(private http: HttpClient) { }

  logLines = [];

  userIpAddr = 'localhost:443';
  terminalInput = '';

  getHelp(): string[] {
    return terminal.help;
  }

  getManPage(page: string): string[] {
    if (page === undefined) { return ['What manual page do you want?']; }
    return [`hi ${page}`];
  }

  getPageData(): string[] {
    return ['This is my about page!'];
  }

  interpretInput(input: string) {
    this.terminalInput = '';

    const terminalRegex = /('[^']*'|"(\\"|[^"])*"|(?:\/(\\\/|[^\/])+\/[gimy]*)(:? |$)|(\\ |[^ ])+|[\w-]+)/gi;
    const terminalArgs: Array<string> = input.match(terminalRegex) || [''];

    let output: string[];
    switch (terminalArgs[0]) {
      case '':
        output = [''];
        break;
      case 'help':
        output = this.getHelp();
        break;
      case 'ls':
        output = this.getPageData();
        break;
      case 'man':
        output = this.getManPage(terminalArgs[1]);
        break;
      default:
        output = [`-mush: ${terminalArgs[0]}: command not found`];
    }

    this.logLines.push(new LogLine(input, output));
  }

  ngOnInit() {
    this.http.get('http://freegeoip.net/json/?callback')
             .subscribe(
                data => this.userIpAddr = (data['ip']),
                error => console.error(error)
             );
  }

}

class LogLine {
  input: string;
  output: string[];

  constructor(input: string, output: string[]) {
    this.input = input;
    this.output = output;
  }
}
