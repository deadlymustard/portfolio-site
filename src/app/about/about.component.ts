import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {terminal} from '../../data/terminal';
import {TerminalService} from '../terminal.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewChecked {


  aboutTextHtml: string;

  constructor(
    private cd: ChangeDetectorRef,
    public terminalService: TerminalService
  ) { }

  ngOnInit() {
    this.aboutTextHtml = terminal.fs['/'].ref.about.ref['about.html'].text.reduce((acc, str) => `${acc}${str}`);
  }

  ngAfterViewChecked(): void {
    this.aboutTextHtml = terminal.fs['/'].ref.about.ref['about.html'].text.reduce((acc, str) => `${acc}${str}`);
    this.cd.detectChanges();
  }



}
