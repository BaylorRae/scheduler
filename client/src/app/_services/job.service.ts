import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class JobService {
  private jobCreatedSource = new Subject<number>();
  private jobDeletedSource = new Subject<number>();

  jobCreated$ = this.jobCreatedSource.asObservable();
  jobDeleted$ = this.jobDeletedSource.asObservable();

  constructor(private http: Http) { }

  all() {
    return this.http.get('/api/jobs').map((response: Response) => response.json());
  }

  create(job): Observable<void> {
    return this.http.post('/api/jobs', {
        command: job.command,
        dyno_size: job.dynoSize,
        frequency: job.frequency,
        run_at: job.runAt
      })
      .map((response: Response) => response.json())
      .map(job => {
        this.jobCreatedSource.next(job.id)
        return job;
      });
  }
  }

  delete(id: number): Observable<void> {
    return this.http.delete(`/api/jobs/${id}`)
      .map((response: Response) => response.json())
      .map(job => {
        this.jobDeletedSource.next(job.id)
        return job;
      });
  }
}
