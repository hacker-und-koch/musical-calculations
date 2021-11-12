import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent implements OnInit {

  constructor(private ref: ElementRef) { }

  @Input() label!: string;
  @Input() value!: string;
  @Output() valueChange = new EventEmitter();
  @Output() changed = new EventEmitter();

  onInputChanged() {
    console.log('Number input changed');
    const value = this.ref.nativeElement.getElementsByTagName('input')[0].value;
    this.valueChange.emit(value);
  }

  ngOnInit(): void {
    console.log('hi!', this.label, this.value);
  }

  handleClick(event: Event) {
    console.log('handling click!');
    if (event.target) {
      if (event.target instanceof HTMLInputElement) {
        event.target.select();
      }
    }
  }

}
