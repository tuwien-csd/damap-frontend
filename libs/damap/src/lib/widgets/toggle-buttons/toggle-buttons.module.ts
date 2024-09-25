import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { ToggleButtonsComponent } from './toggle-buttons.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule, MatButtonModule],
  declarations: [ToggleButtonsComponent],
  exports: [CommonModule, ToggleButtonsComponent, TranslateModule],
})
export class ToggleButtonsModule {}
