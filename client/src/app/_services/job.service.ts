import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class JobService {
  private jobCreatedSource = new Subject<number>();

  jobCreated$ = this.jobCreatedSource.asObservable();

  constructor(private http: Http) { }

  all() {
    return this.http.get('/api/jobs').map((response: Response) => response.json());
  }

  create(job) {
    return this.http.post('/api/jobs', {
        command: job.command,
        dyno_size: job.dynoSize,
        frequency: job.frequency,
        run_at: job.runAt
      })
      .map((response: Response) => response.json())
      .map(job => this.jobCreatedSource.next(job.id));
  }
}
