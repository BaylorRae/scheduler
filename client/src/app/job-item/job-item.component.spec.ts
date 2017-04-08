/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { HttpModule } from '@angular/http';

import { JobService } from '../_services/job.service';

import { JobItemComponent } from './job-item.component';
import { JobFormComponent } from '../job-form/job-form.component';

describe('JobItemComponent', () => {
  let component: JobItemComponent;
  let fixture: ComponentFixture<JobItemComponent>;

  const deleteObservable = {
    subscribe: jasmine.createSpy('delete.subscribe')
  };

  const mockJobService = {
    update: jasmine.createSpy('update'),
    delete: jasmine.createSpy('delete').and.returnValue(deleteObservable)
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MomentModule, HttpModule ],
      declarations: [ JobItemComponent, JobFormComponent ],
      providers: [
        { provide: JobService, useValue: mockJobService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobItemComponent);
    component = fixture.componentInstance;
    component.job = {}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('update', () => {
    it('saves thes changes made to the job');
    it('marks editing as false');
    it('updates the job to the response');
  });

  describe('delete', () => {
    it('deletes the job', () => {
      component.removeJob(1337);
      expect(mockJobService.delete).toHaveBeenCalledWith(1337);
    });

    it('subscribes to the delete request', () => {
      component.removeJob(1337);
      expect(deleteObservable.subscribe).toHaveBeenCalled();
    });
  });
});
