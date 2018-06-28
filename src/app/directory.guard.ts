import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {DirectoryService} from './directory.service';

@Injectable({
  providedIn: 'root'
})
export class DirectoryGuard implements CanActivate {

  constructor(public directory: DirectoryService, public router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.directory.hasRootAccess()) {
      return true;
    } else {
      this.router.navigate(['/about']);
      return false;
    }
  }
}
