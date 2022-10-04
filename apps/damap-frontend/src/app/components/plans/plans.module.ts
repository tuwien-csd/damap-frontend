import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlansComponent} from './plans.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {DmpTableModule} from '../../widgets/dmp-table/dmp-table.module';
import {ErrorMessageModule} from '../../widgets/error-message/error-message.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    DmpTableModule,
    ErrorMessageModule,
    MatPaginatorModule,

    // Materials
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule
  ],
  declarations: [PlansComponent],
  exports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    DmpTableModule,
    ErrorMessageModule,
    PlansComponent,
    MatPaginatorModule,

    // Materials
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule
  ]
})
export class PlansModule {
}
