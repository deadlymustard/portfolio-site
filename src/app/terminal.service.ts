import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  constructor(private http: HttpClient) {

  }

  rootAccess = false;

  remoteCommandSubject = new Subject<object>();
  openTerminal = new Subject<boolean>();

  getRootHint(): Observable<Object> {
    return this.http.get('//localhost:8080/api/root-hint');
  }

  verifyRootPassword(password: string): Observable<Object> {
    return this.http.get(`//localhost:8080/api/root-verify/${password}`);
  }

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

}
