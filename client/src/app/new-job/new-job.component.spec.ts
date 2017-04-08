/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DebugElement } from '@angular/core';

import { JobService } from '../_services/job.service';

import { JobFormComponent } from '../job-form/job-form.component';
import { NewJobComponent } from './new-job.component';

describe('NewJobComponent', () => {
  let component: NewJobComponent;
  let fixture: ComponentFixture<NewJobComponent>;

  const createObservable = {
    subscribe: jasmine.createSpy('subscribe')
  };

  const mockJobService = {
    create: jasmine.createSpy('create').and.returnValue(createObservable)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule ],
      declarations: [ JobFormComponent, NewJobComponent ],
      providers: [
        { provide: JobService, useValue: mockJobService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showForm', () => {
    it('updates the form as editing', () => {
      component.editing = false;
      component.showForm();
      expect(component.editing).toBeTruthy();
    });
  });

  describe('hideForm', () => {
    it('updates the form as not editing', () => {
      component.editing = true;
      component.hideForm();
      expect(component.editing).toBeFalsy();
    });
  });

  describe('createJob', () => {
    it('creates the job with the passed parameters', () => {
      component.createJob({ param1: 'param-1', param2: 'param-2' });
      expect(mockJobService.create).toHaveBeenCalledWith({
        param1: 'param-1',
        param2: 'param-2'
      });
    });

    it('updates the form as not editing', () => {
      let successCallback;
      createObservable.subscribe = (success) => successCallback = success;

      component.editing = true;
      component.createJob({ param1: 'param-1', param2: 'param-2' });
      successCallback();

      expect(component.editing).toBeFalsy();
    });
  });
});
