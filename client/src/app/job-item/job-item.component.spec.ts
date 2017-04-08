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

  const updateObservable = {
    subscribe: jasmine.createSpy('update.subscribe')
  }

  const deleteObservable = {
    subscribe: jasmine.createSpy('delete.subscribe')
  };

  const mockJobService = {
    update: jasmine.createSpy('update').and.returnValue(updateObservable),
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

  describe('editJob', () => {
    it('marks the item as editing', () => {
      component.editing = false;
      component.editJob();
      expect(component.editing).toBeTruthy();
    });
  });

  describe('stopEditing', () => {
    it('marks the item as not editing', () => {
      component.editing = true;
      component.stopEditing();
      expect(component.editing).toBeFalsy();
    });
  });

  describe('update', () => {
    it('saves thes changes made to the job', () => {
      component.job.id = 7331;
      component.saveJob({ param1: 'param-1', param2: 'param-2' })
      expect(mockJobService.update).toHaveBeenCalledWith(7331, {
        param1: 'param-1',
        param2: 'param-2'
      });
    });

    it('subscribes to the update request', () => {
      component.job.id = 1;
      component.saveJob({});
      expect(updateObservable.subscribe).toHaveBeenCalled();
    });

    it('marks editing as false', () => {
      let successCallback;

      updateObservable.subscribe = (success) => successCallback = success;

      component.editing = true;
      component.job.id = 1;
      component.saveJob({});
      successCallback();

      expect(component.editing).toBeFalsy();
    });

    it('updates the job to the response', () => {
      let successCallback;

      updateObservable.subscribe = (success) => successCallback = success;

      component.job.id = 1;
      component.saveJob({});
      successCallback({ param1: 'param-1', param2: 'param-2' });

      expect(component.job).toEqual({
        param1: 'param-1',
        param2: 'param-2'
      });
    });
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
