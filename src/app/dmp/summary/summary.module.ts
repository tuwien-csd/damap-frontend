import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {SummaryComponent} from './summary.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,

    // Materials
    MatTableModule,
    MatProgressBarModule
  ],
  declarations: [SummaryComponent],
  exports: [
    CommonModule,
    TranslateModule,
    SummaryComponent,

    // Materials
    MatTableModule,
    MatProgressBarModule
  ]
})export class SummaryModule {}
