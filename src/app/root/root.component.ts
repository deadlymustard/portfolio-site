import { Component, OnInit } from '@angular/core';
import {DirectoryService} from '../directory.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(
    private directoryService: DirectoryService
  ) { }

  ngOnInit() {
    this.directoryService.setRootAccess(false);
  }

}
