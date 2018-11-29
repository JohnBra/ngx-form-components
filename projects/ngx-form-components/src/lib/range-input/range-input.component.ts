import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nfc-range-input',
  templateUrl: './range-input.component.html',
  styleUrls: ['./range-input.component.css']
})
export class RangeInputComponent implements OnInit {

  minSliderLeft: number;
  maxSliderLeft: number;
  highlightBarWidth: number;
  highlightBarLeft: number;

  constructor() { }

  ngOnInit() {
    this.minSliderLeft = 10;
    this.maxSliderLeft = 50;
    this.highlightBarWidth = 40;
    this.highlightBarLeft = this.minSliderLeft;
  }

}
