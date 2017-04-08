/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { DebugElement } from '@angular/core';

import { AuthenticationService } from '../_services/authentication.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  const loginObservable = {
    subscribe: jasmine.createSpy('observable')
  }

  const mockAuthenticationService = {
    login: jasmine.createSpy('login').and.returnValue(loginObservable);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthenticationService, useValue: mockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it('sends email and password to authentication service', () => {
      component.model = {
        email: 'bob@example.com',
        password: 'password'
      };

      component.login();

      expect(mockAuthenticationService.login).toHaveBeenCalledWith('bob@example.com', 'password');
    });

    it('redirects when successful', () => {
      let successCallback;

      loginObservable.subscribe = (success) => {
        successCallback = success;
      };

      component.login();
      successCallback();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('shows an error when invalid', () => {
      let errorCallback;

      loginObservable.subscribe = (success, error) => {
        errorCallback = error;
      };

      component.login();
      errorCallback();

      expect(component.error).toBeTruthy();
    });
  });
});
