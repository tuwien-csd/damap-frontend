import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlansComponent} from './plans.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {DmpTableModule} from '../widgets/dmp-table/dmp-table.module';
import {ErrorMessageModule} from '../widgets/error-message/error-message.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    DmpTableModule,
    ErrorMessageModule,

    // Materials
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  declarations: [PlansComponent],
  exports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    DmpTableModule,
    ErrorMessageModule,
    PlansComponent,

    // Materials
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class PlansModule {
}
