import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgModule } from '@angular/core';
import { ToggleButtonsComponent } from './toggle-buttons.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
  ],
  declarations: [ToggleButtonsComponent],
  exports: [CommonModule, ToggleButtonsComponent, TranslateModule],
})
export class ToggleButtonsModule {}
