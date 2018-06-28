import {
  AfterViewChecked, AfterViewInit, ApplicationRef, Component, ElementRef, EventEmitter, Input, OnInit, Output,
  ViewChild
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { terminal } from '../../data/terminal';

import * as _ from 'lodash';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {DirectoryService} from '../directory.service';


@Component({
  selector: 'app-navbar-terminal',
  templateUrl: './navbar-terminal.component.html',
  styleUrls: ['./navbar-terminal.component.scss']
})
export class NavbarTerminalComponent implements OnInit, AfterViewInit, AfterViewChecked {


  constructor(
    private http: HttpClient,
    private router: Router,
    private directoryService: DirectoryService,
    private appRef: ApplicationRef
  ) { }

  logLines = [];

  userIpAddr = 'localhost:443';
  terminalInput = '';
  currentDirectory = '/about';

  interactiveMode = false;
  interactiveProcess: string;
  interactiveCallback: string;
  interactivePrompt: string;
  interactiveStep: number;

  editMode = false;
  editWindowText: string;
  editPath: string;


  @Output()
  showTerminal = new EventEmitter<boolean>();

  @ViewChild('terminalPanel') terminalPanel: ElementRef;
  @ViewChild('terminalInputRef') terminalInputRef: ElementRef;
  @ViewChild('editInputRef') editInputRef: ElementRef;


  ngOnInit(): void {
    this.http.get('http://freegeoip.net/json/?callback')
      .subscribe(
        data => this.userIpAddr = (data['ip']),
        error => console.error(error)
      );
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.currentDirectory = event.url;
      }
    });
  }

  ngAfterViewInit(): void {
    this.terminalPanel.nativeElement.height = 16 * 9;
    this.setTerminalFocus();
  }
  ngAfterViewChecked(): void {
    this.terminalPanel.nativeElement.scrollTop = this.terminalPanel.nativeElement.scrollHeight;
    this.setTerminalFocus();
  }

  setTerminalFocus(): void {
    if (!this.editMode) this.terminalInputRef.nativeElement.focus();
    else this.editInputRef.nativeElement.focus();
  }


  interpretInput(input: string): void {
    console.log(this.currentDirectory);
    this.terminalInput = '';
    const output = this.generateCommandOutput(input);
    this.logLines.push(new LogLine(`[user@${this.userIpAddr}]$ ${input}`, output));
    console.log(this.currentDirectory);
  }

  generateCommandOutput(input: string): string[] {
    const terminalRegex = /('[^']*'|"(\\"|[^"])*"|(?:\/(\\\/|[^\/])+\/[gimy]*)(:? |$)|(\\ |[^ ])+|[\w-]+)/gi;
    const terminalArgs: Array<string> = input.match(terminalRegex) || [''];
    console.log(terminalArgs);

    switch (terminalArgs[0]) {
      case '':
        return [''];
      case 'help':
        return this.getHelp();
      case 'exit':
        this.showTerminal.emit(false);
        return [''];
      case 'sudo':
        this.setInteractiveMode(
          true,
          InteractiveProcess.SUDO,
          terminalArgs.slice(1, terminalArgs.length).reduce((acc, str) => acc + ' ' + str)
        );
        return [''];
      case 'mush':
        if (terminalArgs.length === 1) { return ['']; }
        console.log(terminalArgs.slice(1, terminalArgs.length).reduce((acc, str) => acc + ' ' + str));
        return this.generateCommandOutput(terminalArgs.slice(1, terminalArgs.length).reduce((acc, str) => acc + ' ' + str));
      case 'ls':
        return this.listFiles(terminalArgs[1]);
      case 'man':
        return this.getManPage(terminalArgs[1]);
      case 'cd':
        return this.changePage(terminalArgs[1]);
      case 'cat':
        return this.printFile(terminalArgs[1]);
      case 'pwd':
        return [this.currentDirectory];
      case 'edit':
        this.setEditMode(true, terminalArgs[1]);
        return [''];
      default:
        return [`-mush: ${terminalArgs[0]}: command not found`];
    }
  }

  interpretPromptInput(input: string) {
    const terminalRegex = /('[^']*'|"(\\"|[^"])*"|(?:\/(\\\/|[^\/])+\/[gimy]*)(:? |$)|(\\ |[^ ])+|[\w-]+)/gi;
    const terminalArgs: Array<string> = input.match(terminalRegex) || [''];

    switch (this.interactiveProcess) {
      case InteractiveProcess.SUDO:
        if (terminalArgs[0] === 'thatwasdelicious') {
          this.directoryService.setRootAccess(true);
          this.logLines.push(
            new LogLine(
              terminal.proc[this.interactiveProcess].step[this.interactiveStep].prompt + input,
              this.generateCommandOutput(this.interactiveCallback)
            )
          );
          this.interactiveStep++;
          this.setInteractiveMode(false);
        } else {
          this.logLines.push(
            new LogLine(terminal.proc[this.interactiveProcess].step[this.interactiveStep].prompt + input, ['Sorry, try again'])
          );
        }
        this.terminalInput = '';
        break;
      default:
        this.setInteractiveMode(false);
        break;
    }
  }

  setEditMode(bool: boolean, path?: string) {

    this.editMode = bool;
    this.interactiveMode = bool;

    if (bool) {
      this.editPath = path;
      this.editWindowText = this.traverseFileSystem(path, this.traverseFileSystem(this.currentDirectory)).text.reduce((acc, str) => {
        return `${acc}\n${str}`;
      });
      this.appRef.tick();
    } else {
      console.log(this.editWindowText);
      this.writeFile(this.editPath, this.editWindowText.split('\n'));
      this.editPath = '';
      this.editWindowText = '';
    }
  }

  setInteractiveMode(bool: boolean, process?: string, callback?: string) {
    this.interactiveMode = bool;
    this.interactiveStep = 0;

    if (process === undefined) {
      this.interactiveProcess = InteractiveProcess.NONE;
      this.interactivePrompt = '';
    } else {
      this.interactiveProcess = process;
      this.interactivePrompt = terminal.proc[process].step[this.interactiveStep].prompt;
    }
    if (callback === undefined) { this.interactiveCallback = ''; } else { this.interactiveCallback = callback; }
  }

  getHelp(): string[] {
    return terminal.help;
  }

  writeFile(path: string, replacment: string[]) {
    const fs: any = this.traverseFileSystem(path, this.traverseFileSystem(this.currentDirectory));
    fs.text = replacment;
  }

  listFiles(path?: string) {
    if (path === undefined || path === '') { path = this.currentDirectory; }
    const fs: any = this.traverseFileSystem(path, this.traverseFileSystem(this.currentDirectory));
    if (fs.hasOwnProperty('type')) {
      if (fs.type === 'dir') {
        if (fs.requireSudo && !this.directoryService.rootAccess) {
          this.setInteractiveMode(true, InteractiveProcess.SUDO, `ls ${path}`);
          return [''];
        }
        return Object.keys(fs.ref);
      } else {
        return [`cat: ${path}: Not a directory`];
      }
    } else {
      return [`cat: ${path}: No such file or directory`];
    }
  }

  printFile(path: string): string[] {
    if (path === undefined || path === '') { return ['']; }
    const fs: any = this.traverseFileSystem(path, this.traverseFileSystem(this.currentDirectory));
    if (fs.hasOwnProperty('type')) {
      if (fs.type === 'file') {
        if (fs.requireSudo && !this.directoryService.rootAccess) {
          this.setInteractiveMode(true, InteractiveProcess.SUDO, `cat ${path}`);
          return [''];
        }
        return [fs.text.reduce((acc, str) => `${acc} ${str}`)];
      } else {
        return [`cat: ${path}: Is a directory`];
      }
    } else {
      return [`cat: ${path}: No such file or directory`];
    }
  }

  changePage(path: string): string[] {
    if (path === undefined || path === '') { path = this.currentDirectory; }
    const fs: any = this.traverseFileSystem(path, this.traverseFileSystem(this.currentDirectory));
    if (fs.hasOwnProperty('type')) {
      if (fs.type === 'dir') {
        if (fs.requireSudo && !this.directoryService.rootAccess) {
          this.setInteractiveMode(true, InteractiveProcess.SUDO, `cd ${path}`);
          return [''];
        }
        let finalRoute;
        if (fs.name === '/') {
            finalRoute = '/';
        } else {
          finalRoute = `/${fs.name}`;
        }
        this.router.navigate([finalRoute]);
        return [''];
      } else {
        return [`-mush: cd: ${path}: Not a directory`];
      }
    } else {
      return [`-mush: cd: ${path}: No such file or directory`];
    }
  }

  traverseFileSystem(path: string[] | string, fs?: any): any {
    if (path as string  === '/') { return terminal.fs['/']; }
    if (path as string === '..' || path as string === '../' || path as string === '../.') {
      return this.traverseFileSystem(this.traverseFileSystem(this.currentDirectory).parent);
    }
    if (path as string === '.' || path as string === './'  || path as string === './.') {
      return this.traverseFileSystem(this.currentDirectory);
    }
    if (typeof path === 'string') { path = path.split('/'); }
    if (path === undefined && this.currentDirectory === '/') { return terminal.fs['/']; }
    if (path === undefined) { path = this.currentDirectory.split('/'); }
    if (fs === undefined) { fs = terminal.fs['/']; }


    if (fs.ref.hasOwnProperty(path[0]) && path.length === 1) {
      return fs.ref[path[0]];
    } else if (!fs.ref.hasOwnProperty(path[0]) && path.length === 1) {
      return {};
    } else {
      return this.traverseFileSystem(path.slice(1 , path.length), fs.ref[path[0]]);
    }

  }

  getManPage(page: string): string[] {
    if (page === undefined) { return ['What manual page do you want?']; }
    if (!terminal.man.hasOwnProperty(page)) { return [`No manual page for ${page}`]; }

    const terminalMap = terminal.man[page].map((keyVal) => {
      const key = Object.keys(keyVal);
      return [key.toString().toUpperCase(), keyVal[key[0]]];
    });

    return _.flatten(terminalMap);
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

enum InteractiveProcess {
  NONE = '',
  SUDO = 'sudo'
}
