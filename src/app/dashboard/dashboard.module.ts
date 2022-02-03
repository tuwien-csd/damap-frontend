import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, TranslateModule],
  exports: [CommonModule, DashboardComponent]
})
export class DashboardModule {}
