/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

import { JobFormComponent } from './job-form.component';

describe('JobFormComponent', () => {
  let component: JobFormComponent;
  let fixture: ComponentFixture<JobFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ JobFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cancelEvent', () => {
    it('calls subscribers to the cancel event', () => {
      const cancelCallback = jasmine.createSpy('cancel');
      component.cancel.subscribe(cancelCallback);
      component.cancelEvent();
      expect(cancelCallback).toHaveBeenCalled();
    });
  });

  describe('saveEvent', () => {
    const saveCallback = jasmine.createSpy('save');

    beforeEach(() => {
      component.save.subscribe(saveCallback);
    });

    it('calls subscribers to the save event', () => {
      component.saveEvent();
      expect(saveCallback).toHaveBeenCalled();
    });

    it('passes the job object to subscribers', () => {
      component.model = { param1: 'param-1', param2: 'param-2' };
      component.saveEvent();
      expect(saveCallback).toHaveBeenCalledWith({
        param1: 'param-1',
        param2: 'param-2'
      });
    });
  });
});
