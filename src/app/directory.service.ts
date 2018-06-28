import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  rootAccess = false;

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
