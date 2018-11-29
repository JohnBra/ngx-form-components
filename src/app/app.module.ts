import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxFormComponentsModule } from 'ngx-form-components';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxFormComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
