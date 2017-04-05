import { Component, Input, OnInit } from '@angular/core';

import { JobService } from '../_services/job.service';

@Component({
  selector: 'job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit {
  @Input() job;

  editing: boolean = false;

  constructor(private jobService: JobService) { }

  ngOnInit() {
  }

  editJob() {
    this.editing = true;
  }

  stopEditing() {
    this.editing = false;
  }

  saveJob(job) {
    this.jobService.update(this.job.id, job)
      .subscribe(newJob => {
        this.editing = false;
        this.job = newJob;
      });
  }

  removeJob(id: number) {
    this.jobService.delete(id).subscribe();
  }
}
