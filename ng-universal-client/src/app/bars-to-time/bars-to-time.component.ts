import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { padTime as pad, measuresToTime } from '../util';


@Component({
  selector: 'app-bars-to-time',
  templateUrl: './bars-to-time.component.html',
  styleUrls: ['./bars-to-time.component.scss', '../app.component.scss']
})
export class BarsToTimeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.calcResult();

  }

  public values = {
    bars: "16",
    bpm: "120",
  }
  public collapsed = false;

  public signature: string = "4"; // 4/4; use '3' for 3/4

  private _result = new BehaviorSubject({ time: 42, timeStr: 'unset' });
  get result() {
    return this._result.asObservable();
  }

  ngAfterContentChecked() {
    this.calcResult();
  }

  public calcResult() {
    const time = measuresToTime({
      bars: Number(this.values.bars),
      bpm: Number(this.values.bpm),
      beatsPerMeasure: Number(this.signature),
    });
    const date = new Date(time);
    const timeStr = `${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    this._result.next({ time, timeStr });
  }
}
