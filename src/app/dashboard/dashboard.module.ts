import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule, RouterModule, TranslateModule,
    // Materials
    MatButtonModule, MatIconModule
  ],
  exports: [
    CommonModule,
    DashboardComponent,

    // Materials
    MatButtonModule, MatIconModule
  ]
})
export class DashboardModule {
}
