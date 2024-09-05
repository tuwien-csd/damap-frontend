import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FlipCardComponent } from '../../widgets/flip-card/flip-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DashboardComponent, FlipCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    // Materials
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: [
    CommonModule,
    DashboardComponent,

    // Materials
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class DashboardModule {}
