import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  rootAccess = false;

  remoteCommandSubject = new Subject<object>();
  openTerminal = new Subject<boolean>();

  sendRemoteCommand(command: string, shouldOpen: boolean, shouldEvaluate: boolean) {
    this.remoteCommandSubject.next({command, shouldOpen, shouldEvaluate});
  }

  getRemoteCommand(): Observable<object> {
    return this.remoteCommandSubject.asObservable();
  }

  shouldOpenTerminal(bool: boolean)  {
    this.openTerminal.next(bool);
  }

  getShouldOpenTerminal(): Observable<boolean> {
    return this.openTerminal.asObservable();
  }

  hasRootAccess() {
    return this.rootAccess;
  }

  toggleRootAccess() {
    this.rootAccess = !this.hasRootAccess();
  }

  setRootAccess(bool: boolean) {
    this.rootAccess = bool;
  }

  constructor() { }
}
