import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectComponent} from './project.component';
import {ProjectFilterPipe} from './project-filter.pipe';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorMessageModule} from '../../../widgets/error-message/error-message.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ManualProjectInputComponent} from './manual-project-input/manual-project-input.component';
import {SharedModule} from '../../../shared/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ProjectListComponent} from './project-list/project-list.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [CommonModule,
    TranslateModule,
    ErrorMessageModule,
    SharedModule,

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
  declarations: [ProjectComponent, ProjectFilterPipe, ManualProjectInputComponent, ProjectListComponent],
  exports: [
    CommonModule,
    TranslateModule,
    ErrorMessageModule,
    SharedModule,
    ProjectComponent,

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
  ]
})
export class ProjectModule {
}
