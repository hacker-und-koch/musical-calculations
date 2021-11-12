import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss', '../app.component.scss']
})
export class NumberInputComponent implements OnInit {

  constructor(private ref: ElementRef) { }

  @Input() label!: string;
  @Input() value!: string;
  @Output() valueChange = new EventEmitter();
  @Output() changed = new EventEmitter();

  private inputElement!: HTMLInputElement;

  onInputChanged() {
    const value = this.inputElement.value;
    this.valueChange.emit(value);
  }

  ngOnInit(): void {
    this.inputElement = this.ref.nativeElement.getElementsByTagName('input')[0];
  }

  handleClick() {
    this.inputElement.select();
  }
}
