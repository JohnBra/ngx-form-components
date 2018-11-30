import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  rangeValSingle: number;
  rangeValArray: number[];

  constructor() {}

  handleRangeChangeSingle(rangeValEmitted: any) {
    this.rangeValSingle = rangeValEmitted;
  }

  handleRangeChangeArray(rangeValEmitted: any) {
    this.rangeValArray = rangeValEmitted;
  }
}
