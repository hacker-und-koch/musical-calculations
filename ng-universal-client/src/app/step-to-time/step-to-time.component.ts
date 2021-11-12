import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { stepToTime } from '../util';

@Component({
  selector: 'app-step-to-time',
  templateUrl: './step-to-time.component.html',
  styleUrls: ['./step-to-time.component.scss', '../app.component.scss']
})
export class StepToTimeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public collapsed = false;
  
  private _title!: string;
  get title() {
    return this._title;
  }

  public values = {
    stepUpper: "1",
    stepLower: "16",
    bpm: "120",
  }

  private _result = new BehaviorSubject({ time: 42, timeStr: 'unset' });
  get result() {
    return this._result.asObservable();
  }

  ngAfterContentChecked() {
    this.calcResult();
  }

  public calcResult() {
    const time = stepToTime({
      step: Number(this.values.stepUpper) / Number(this.values.stepLower),
      bpm: Number(this.values.bpm),
    });
    // const date = new Date(time);
    const timeStr = `${time.toFixed(2)} ms`;
    this._result.next({ time, timeStr });
  }

  public scaleInput(multiplier: number) {
    if (multiplier > 1 && Number(this.values.stepUpper) > 1) {
      this.values.stepUpper = String(Number(this.values.stepUpper) / multiplier)
    } else if (multiplier > 1 || Number(this.values.stepLower) > 1.0) {
      this.values.stepLower = String(Number(this.values.stepLower) * multiplier);
    } else {
      this.values.stepUpper = String(Number(this.values.stepUpper) / multiplier);
    }
  }
}
