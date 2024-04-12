import { CommonModule } from '@angular/common';
import { ErrorMessageModule } from '../../../widgets/error-message/error-message.module';
import { InfoMessageModule } from '../../../widgets/info-message/info-message.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ManualProjectInputComponent } from './manual-project-input/manual-project-input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ErrorMessageModule,
    SharedModule,
    InfoMessageModule,

    // Materials
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatTabsModule,
  ],
  declarations: [
    ProjectComponent,
    ManualProjectInputComponent,
    ProjectListComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ErrorMessageModule,
    SharedModule,
    ProjectComponent,
    InfoMessageModule,

    // Materials
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatTabsModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class ProjectModule {}
