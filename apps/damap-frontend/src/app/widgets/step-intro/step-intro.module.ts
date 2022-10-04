import {NgModule} from '@angular/core';
import {StepIntroComponent} from './step-intro.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [StepIntroComponent],
  exports: [
    CommonModule,
    StepIntroComponent
  ]
})
export class StepIntroModule {
}
