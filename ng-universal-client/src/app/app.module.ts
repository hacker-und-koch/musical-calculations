import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarsToTimeComponent } from './bars-to-time/bars-to-time.component';
import { StepToTimeComponent } from './step-to-time/step-to-time.component';
import { NumberInputComponent } from './number-input/number-input.component';

@NgModule({
  declarations: [
    AppComponent,
    BarsToTimeComponent,
    StepToTimeComponent,
    NumberInputComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
