import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class JobService {
  constructor(private http: Http) { }

  all() {
    return this.http.get('/api/jobs').map((response: Response) => response.json());
  }
}
