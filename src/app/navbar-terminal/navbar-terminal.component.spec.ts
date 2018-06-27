import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTerminalComponent } from './navbar-terminal.component';

describe('NavbarTerminalComponent', () => {
  let component: NavbarTerminalComponent;
  let fixture: ComponentFixture<NavbarTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
