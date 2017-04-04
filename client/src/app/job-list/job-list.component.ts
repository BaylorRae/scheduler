import { Component, OnInit } from '@angular/core';

import { JobService } from '../_services/job.service';

class Job {
  command: string
}

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.loadJobs();
  }

  private loadJobs() {
    this.jobService.all().subscribe(jobs => this.jobs = jobs);
  }

}
