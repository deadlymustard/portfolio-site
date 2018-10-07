import {AfterViewChecked, ChangeDetectorRef, Component, ComponentFactoryResolver, HostListener, OnInit} from '@angular/core';
import {TerminalService} from '../terminal.service';
import {terminal} from '../../data/terminal';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit, AfterViewChecked {


  resumeTextHtml: string;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    public terminalService: TerminalService
  ) { }


  ngOnInit() {
    this.resumeTextHtml = terminal.fs['/'].ref.resume.ref['resume.html'].text.reduce((acc, str) => `${acc}${str}`);
  }

  ngAfterViewChecked(): void {
    this.resumeTextHtml = terminal.fs['/'].ref.resume.ref['resume.html'].text.reduce((acc, str) => `${acc}${str}`);
    this.cd.detectChanges();
  }

}

