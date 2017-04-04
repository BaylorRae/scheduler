import { Component, OnInit } from '@angular/core';

import { JobService } from '../_services/job.service';

const defaultModel = { dynoSize: 'Hobby', frequency: 'daily', nextDue: '00:30' };

@Component({
  selector: 'new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent implements OnInit {
  editing: boolean = false;
  model: any = {};

  constructor(private jobService: JobService) {
    this.model = defaultModel;
  }

  ngOnInit() {
  }

  showForm() {
    this.editing = true;
  }

  hideForm() {
    this.model = defaultModel;
    this.editing = false;
  }

  createJob() {
    this.jobService.create(this.model)
      .subscribe(
        job => {
          this.model = {};
          this.editing = false;
        },
        error => {
        });
  }

}
