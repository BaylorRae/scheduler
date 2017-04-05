import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {
  @Input() job;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();

  model: any = {};

  constructor() { }

  ngOnInit() {
    this.model = this.job || {};
  }

  cancelEvent() {
    this.cancel.emit();
  }

  saveEvent() {
    this.save.emit(this.model);
  }
}
