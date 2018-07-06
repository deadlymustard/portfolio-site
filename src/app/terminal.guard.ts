import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TerminalService} from './terminal.service';

@Injectable({
  providedIn: 'root'
})
export class TerminalGuard implements CanActivate {

  constructor(public terminal: TerminalService, public router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.terminal.hasRootAccess()) {
      return true;
    } else {
      this.router.navigate(['/about']);
      return false;
    }
  }
}
