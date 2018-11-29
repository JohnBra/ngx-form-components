import { NgModule } from '@angular/core';
import { NgxFormComponentsComponent } from './ngx-form-components.component';
import { RangeInputComponent } from './range-input/range-input.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NgxFormComponentsComponent,
    RangeInputComponent],
  imports: [
    CommonModule
  ],
  exports: [
    NgxFormComponentsComponent,
    RangeInputComponent
  ]
})
export class NgxFormComponentsModule { }
