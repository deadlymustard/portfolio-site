import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {terminal} from '../../data/terminal';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit, AfterViewChecked {


  aboutTextHtml: string;

  constructor() { }

  ngOnInit() {
    this.aboutTextHtml = terminal.fs['/'].ref.about.ref['about.txt'].text.reduce((acc, str) => `${acc}${str}`);
  }

  ngAfterViewChecked(): void {
    this.aboutTextHtml = terminal.fs['/'].ref.about.ref['about.txt'].text.reduce((acc, str) => `${acc}${str}`);

  }

  ngAfterViewInit(): void {
    this.aboutTextHtml = terminal.fs['/'].ref.about.ref['about.txt'].text.reduce((acc, str) => `${acc}${str}`);

  }

}
