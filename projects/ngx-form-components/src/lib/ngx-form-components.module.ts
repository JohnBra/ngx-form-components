import { NgModule } from '@angular/core';
import { NgxFormComponentsComponent } from './ngx-form-components.component';
import { RangeInputComponent } from './range-input/range-input.component';

@NgModule({
  declarations: [
    NgxFormComponentsComponent,
    RangeInputComponent],
  imports: [
  ],
  exports: [
    NgxFormComponentsComponent,
    RangeInputComponent
  ]
})
export class NgxFormComponentsModule { }
