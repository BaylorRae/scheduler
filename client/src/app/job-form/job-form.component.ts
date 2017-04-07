import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

const padNumber = (num) => num < 10 ? `0${num}` : num;

const DAILY_OPTIONS = Array.from(Array(24))
  .map((x, i) => padNumber(i)) 
  .map(i => [i + ':00', i + ':30'])
  .reduce((a, i) => { a.push(...i); return a }, []);

const HOURLY_OPTIONS = [0, 10, 20, 30, 40, 50]
  .map(i => padNumber(i))
  .map(i => '00:' + i);

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
  runAtOptions: string[] = DAILY_OPTIONS;

  constructor() { }

  ngOnInit() {
    this.model = this.job || {};
    this.changeFrequency(this.model.frequency);
  }

  changeFrequency(frequency) {
    this.runAtOptions = frequency === 'hourly' ? HOURLY_OPTIONS : DAILY_OPTIONS;
  }

  cancelEvent() {
    this.cancel.emit();
  }

  saveEvent() {
    this.save.emit(this.model);
  }
}
