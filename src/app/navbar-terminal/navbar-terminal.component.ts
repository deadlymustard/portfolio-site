import {
  AfterViewChecked, AfterViewInit, ApplicationRef, Component, ElementRef, EventEmitter, Input, OnInit, Output,
  ViewChild
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { terminal } from '../../data/terminal';

import * as _ from 'lodash';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {TerminalService} from '../terminal.service';

const EMPTY_TERMINAL_RESPONSE = [''];


@Component({
  selector: 'app-navbar-terminal',
  templateUrl: './navbar-terminal.component.html',
  styleUrls: ['./navbar-terminal.component.scss']
})
export class NavbarTerminalComponent implements OnInit, AfterViewInit, AfterViewChecked {


  constructor(
    private http: HttpClient,
    private router: Router,
    private terminalService: TerminalService,
    private appRef: ApplicationRef
  ) { }

  logLines: LogLine[] = [];

  commandHistory: string[] = [];
  historyIndex = 0;

  userIpAddr: string;
  terminalInput: string;
  currentDirectory: string;
  rootAccess: boolean;
  isTerminalOpen: boolean;

  interactiveMode: boolean;
  interactiveProcess: string;
  interactiveCallback: string;
  interactivePrompt: string;
  interactiveStep: number;

  editMode: boolean;
  editWindowText: string;
  editPath: string;

  @Input()
  isNavbarMobile: boolean;

  @Output()
  showTerminal = new EventEmitter<boolean>();

  @ViewChild('terminalPanel') terminalPanel: ElementRef;
  @ViewChild('terminalInputRef') terminalInputRef: ElementRef;
  @ViewChild('editInputRef') editInputRef: ElementRef;


  // Initializing our terminal with some default values (ip, directory, input, etc...)
  ngOnInit(): void {
    this.http.get('http://freegeoip.net/json/?callback')
      .subscribe(
        data => this.userIpAddr = (data['ip']),
        error => this.userIpAddr = 'localhost:443'
      );
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.currentDirectory = event.url;
      }
    });
    this.terminalService.getShouldOpenTerminal().subscribe((bool) => {
      this.isTerminalOpen = bool;
    });
    this.terminalService.getRemoteCommand().subscribe((params: any) => {
      if (params.shouldOpen && !this.isTerminalOpen) { this.showTerminal.emit(params.shouldOpen); }
      this.interpretInput(params.command, params.shouldEvaluate);
    });
    this.terminalService.getShouldOpenTerminal().subscribe((bool) => {
      this.showTerminal.emit(bool);
    });
    this.terminalInput = '';
    this.interactiveMode = false;
    this.editMode = false;
    this.rootAccess = false;
  }

  ngAfterViewInit(): void {
    this.terminalPanel.nativeElement.height = 16 * 9;
    this.setTerminalFocus();
  }

  ngAfterViewChecked(): void {
    this.terminalPanel.nativeElement.scrollTop = this.terminalPanel.nativeElement.scrollHeight;
    this.setTerminalFocus();
  }

  private setEditMode(bool: boolean, path?: string) {

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

  private setInteractiveMode(bool: boolean, process?: string, callback?: string) {
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

  // Set focus so the terminal is the default typing place
  private setTerminalFocus(): void {
    if (!this.editMode) this.terminalInputRef.nativeElement.focus();
    else this.editInputRef.nativeElement.focus();
  }

  // Kick off interpreter and push the result to the terminal screen
  private interpretInput(input: string, shouldEvaluate: boolean): void {
    this.terminalInput = '';
    let output = [''];
    if (shouldEvaluate) { output = this.generateCommandOutput(input); }

    if (input !== '') {
      this.commandHistory.push(input);
      this.historyIndex = this.commandHistory.length;
    }

    this.logLines.push(new LogLine(`[user@${this.userIpAddr}]$ ${input}`, output));
  }

  // Basic command loop that routes commands to various functions
  private generateCommandOutput(input: string): string[] {

    const terminalRegex = /('[^']*'|"(\\"|[^"])*"|(?:\/(\\\/|[^\/])+\/[gimy]*)(:? |$)|(\\ |[^ ])+|[\w-]+)/gi;
    const terminalArgs: Array<string> = input.match(terminalRegex) || [''];

    const inputCommand = terminalArgs[0];
    const firstTerminalArg = terminalArgs[1];

    switch (inputCommand) {
      case MushCommand.NONE:
        return EMPTY_TERMINAL_RESPONSE;
      case MushCommand.HELP:
        return terminal.help;
      case MushCommand.EXIT:
        return this.exit();
      case MushCommand.MUSH:
        return this.mush(terminalArgs);
      case MushCommand.SUDO:
        return this.startSudo(terminalArgs);
      case MushCommand.EDIT:
        return this.startEdit(firstTerminalArg);
      case MushCommand.LS:
        return this.listFiles(firstTerminalArg);
      case MushCommand.MAN:
        return this.getManPage(firstTerminalArg);
      case MushCommand.CD:
        return this.changePage(firstTerminalArg);
      case MushCommand.CAT:
        return this.printFile(firstTerminalArg);
      case MushCommand.PWD:
        return [this.currentDirectory];
      default:
        return [`-mush: ${terminalArgs[0]}: command not found`];
    }
  }

  /* START NON-INTERACTIVE COMMANDS */
  private exit(): string[] {
    this.showTerminal.emit(false);
    return EMPTY_TERMINAL_RESPONSE;
  }

  private mush(argsCallback: string[]): string[] {
    if (argsCallback.length === 1) return EMPTY_TERMINAL_RESPONSE;
    else return this.generateCommandOutput(argsCallback.slice(1, argsCallback.length).reduce((acc, str) => `${acc} ${str}`));
  }

  private startSudo(argsCallback: string[]) {
    this.setInteractiveMode(true, InteractiveProcess.SUDO,
      argsCallback.slice(1, argsCallback.length).reduce((acc, str) => `${acc} ${str}`));

    this.terminalInput = '';

    return EMPTY_TERMINAL_RESPONSE;
  }

  private startEdit(path: string) {
    if (!_.isEmpty(this.traverseFileSystem(path, this.traverseFileSystem(this.currentDirectory)))) {
      this.setEditMode(true, path); return EMPTY_TERMINAL_RESPONSE;
    }
    return [`-mush: edit: ${path}: No such file or directory`];
  }

  private listFiles(path?: string) {
    if (path === undefined || path === '') { path = this.currentDirectory; }
    const fs: any = this.traverseFileSystem(path, this.traverseFileSystem(this.currentDirectory));

    if (fs.hasOwnProperty('type')) {
      if (fs.type === 'dir') {
        if (fs.requireSudo && !this.rootAccess) {
          this.setInteractiveMode(true, InteractiveProcess.SUDO, `ls ${path}`);
          return EMPTY_TERMINAL_RESPONSE;
        }
        return Object.keys(fs.ref);
      } else {
        return [`-mush: ls: ${path}: Not a directory`];
      }
    } else {
      return [`-mush: ls: ${path}: No such file or directory`];
    }
  }

  private getManPage(page: string): string[] {
    if (page === undefined) return ['What manual page do you want?'];
    if (!terminal.man.hasOwnProperty(page)) return [`No manual page for ${page}`];

    const terminalMap = terminal.man[page].map((keyVal) => {
      const key = Object.keys(keyVal);
      return [key.toString().toUpperCase(), keyVal[key[0]]];
    });

    return _.flatten(terminalMap);
  }

  private changePage(path: string): string[] {
    if (path === undefined || path === '') { path = this.currentDirectory; }
    const fs: any = this.traverseFileSystem(path, this.traverseFileSystem(this.currentDirectory));

    if (fs.hasOwnProperty('type')) {
      if (fs.type === 'dir') {
        if (fs.requireSudo && !this.rootAccess) {
          this.setInteractiveMode(true, InteractiveProcess.SUDO, `cd ${path}`);
          return EMPTY_TERMINAL_RESPONSE;
        }

        let finalRoute;
        if (fs.name === '/')
          finalRoute = '/';
        else
          finalRoute = `/${fs.name}`;
        this.router.navigate([finalRoute]);

        return EMPTY_TERMINAL_RESPONSE;
      } else {
        return [`-mush: cd: ${path}: Not a directory`];
      }
    } else {
      return [`-mush: cd: ${path}: No such file or directory`];
    }
  }

  private printFile(path: string): string[] {
    if (path === undefined || path === '') { return EMPTY_TERMINAL_RESPONSE; }
    const fs: any = this.traverseFileSystem(path, this.traverseFileSystem(this.currentDirectory));

    if (fs.hasOwnProperty('type')) {
      if (fs.type === 'file') {
        if (fs.requireSudo && !this.rootAccess) {
          this.setInteractiveMode(true, InteractiveProcess.SUDO, `cat ${path}`);
          return EMPTY_TERMINAL_RESPONSE;
        }
        return [fs.text.reduce((acc, str) => `${acc} ${str}`)];
      } else {
        return [`-mush: cat: ${path}: Is a directory`];
      }
    } else {
      return [`-mush: cat: ${path}: No such file or directory`];
    }
  }

  private fetchLastCommand() {
    if (this.historyIndex !== 0)  this.historyIndex--;
    this.terminalInput = this.commandHistory[this.historyIndex];
  }
  /* END NON-INTERACTIVE COMMANDS */

  private interpretPromptInput(input: string) {
    const terminalRegex = /('[^']*'|"(\\"|[^"])*"|(?:\/(\\\/|[^\/])+\/[gimy]*)(:? |$)|(\\ |[^ ])+|[\w-]+)/gi;
    const terminalArgs: Array<string> = input.match(terminalRegex) || [''];

    const promptInput = terminalArgs[0];


    switch (this.interactiveProcess) {
      case InteractiveProcess.SUDO:
        this.runSudoStep(promptInput, input);
        break;
      default:
        this.setInteractiveMode(false);
        break;
    }
  }

  /* START INTERACTIVE COMMANDS */
  private runSudoStep(input: string, promptInput: string) {
    this.terminalService.verifyRootPassword(promptInput).subscribe((data: any) => {
      if (data.valid) {
        this.terminalService.setRootAccess(true);
        this.rootAccess = true;
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
    });
  }
  /* END INTERACTIVE COMMANDS */


  /* START FILE SYSTEM UTIL COMMANDS */
  private writeFile(path: string, replacment: string[]) {
    const fs: any = this.traverseFileSystem(path, this.traverseFileSystem(this.currentDirectory));
    fs.text = replacment;
  }

  private traverseFileSystem(path: string[] | string, fs?: any): any {
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
  /* END FILE SYSTEM UTIL COMMANDS */
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
  NONE = '', SUDO = 'sudo'
}

enum MushCommand {
  NONE = '', MUSH = 'mush', HELP = 'help', EXIT = 'exit', SUDO = 'sudo',
  MAN = 'man', LS = 'ls', CD = 'cd', CAT = 'cat', PWD = 'pwd', EDIT = 'edit'
}
