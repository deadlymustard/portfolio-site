import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  hideNavbar = new Subject<boolean>();


  constructor() { }

  shouldHideNavbar(bool: boolean)  {
    this.hideNavbar.next(bool);
  }

  getShouldHideNavbar(): Observable<boolean> {
    return this.hideNavbar.asObservable();
  }
}
