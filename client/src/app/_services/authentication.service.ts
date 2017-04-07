import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  authenticated(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  login(email: string, password: string) {
    return this.http.post('/api/authenticate', { email: email, password: password })
      .map((response: Response) => {
        if(response.ok) {
          localStorage.setItem('loggedIn', 'true');
        }
      });
  }
}
