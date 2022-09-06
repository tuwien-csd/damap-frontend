import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DmpActionsComponent, SaveVersionDialogComponent} from './dmp-actions.component';
import {SaveStatusModule} from '../../widgets/save-status/save-status.module';
import {TranslateModule} from '@ngx-translate/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    DmpActionsComponent,
    SaveVersionDialogComponent
  ],
  exports: [
    DmpActionsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    SaveStatusModule,

    // Materials
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule
  ]
})
export class DmpActionsModule {
}
