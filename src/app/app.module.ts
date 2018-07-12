import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarTerminalComponent } from './navbar-terminal/navbar-terminal.component';
import { AboutComponent } from './about/about.component';
import { ResumeComponent } from './resume/resume.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RootComponent } from './root/root.component';
import {TerminalGuard} from './terminal.guard';
import {TextareaAutosizeModule} from 'ngx-textarea-autosize';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Angular2ImageGalleryModule} from 'angular2-image-gallery';
import {ParticlesModule} from 'angular-particle';


const appRoutes: Routes = [
  { path : '', component: RootComponent, canActivate: [TerminalGuard]},
  { path: 'about', component: AboutComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarTerminalComponent,
    AboutComponent,
    ResumeComponent,
    PortfolioComponent,
    PageNotFoundComponent,
    RootComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TextareaAutosizeModule,
    Angular2ImageGalleryModule,
    ParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
