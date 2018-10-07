import {AfterViewChecked, ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {TerminalService} from '../terminal.service';
import {terminal} from '../../data/terminal';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, AfterViewChecked {

  portfolioTextHtml: string;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    public terminalService: TerminalService
  ) { }


  ngOnInit() {
    this.portfolioTextHtml = terminal.fs['/'].ref.portfolio.ref['portfolio.html'].text.reduce((acc, str) => `${acc}${str}`);
  }

  ngAfterViewChecked(): void {
    this.portfolioTextHtml = terminal.fs['/'].ref.portfolio.ref['portfolio.html'].text.reduce((acc, str) => `${acc}${str}`);
    this.cd.detectChanges();
  }

}
