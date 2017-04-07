/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';

import { JobService } from '../_services/job.service';

import { JobListComponent } from './job-list.component';
import { JobItemComponent } from '../job-item/job-item.component';
import { NewJobComponent } from '../new-job/new-job.component';
import { JobFormComponent } from '../job-form/job-form.component';

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MomentModule, HttpModule ],
      declarations: [
        JobListComponent,
        JobItemComponent,
        NewJobComponent,
        JobFormComponent
      ],
      providers: [ JobService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
