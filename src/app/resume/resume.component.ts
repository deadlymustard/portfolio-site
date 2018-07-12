import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  isMobile = false;

  constructor() { }


  ngOnInit() {
    this.isMobile = window.innerWidth <= 550;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = window.innerWidth <= 550;
  }

}

