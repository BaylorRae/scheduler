import { Component, OnInit } from '@angular/core';

import { JobService } from '../_services/job.service';

@Component({
  selector: 'new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent implements OnInit {
  editing: boolean = false;

  constructor(private jobService: JobService) {
  }

  ngOnInit() {
  }

  showForm() {
    this.editing = true;
  }

  hideForm() {
    this.editing = false;
  }

  createJob(job) {
    this.jobService.create(job)
      .subscribe(
        job => {
          this.editing = false;
        },
        error => {
        });
  }
}
