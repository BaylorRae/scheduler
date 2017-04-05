import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';

import { routing } from './app.routing';

import { AuthenticationService } from './_services/authentication.service';
import { JobService } from './_services/job.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { JobListComponent } from './job-list/job-list.component';
import { NewJobComponent } from './new-job/new-job.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobItemComponent } from './job-item/job-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JobListComponent,
    NewJobComponent,
    JobFormComponent,
    JobItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    routing
  ],
  providers: [
    AuthenticationService,
    JobService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
