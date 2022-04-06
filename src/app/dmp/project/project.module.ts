import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectComponent} from './project.component';
import {ProjectFilterPipe} from './project-filter.pipe';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorMessageModule} from '../../widgets/error-message/error-message.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  imports: [CommonModule,
    TranslateModule,
    ErrorMessageModule,

    // Materials
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule
  ],
  declarations: [ProjectComponent, ProjectFilterPipe],
  exports: [
    CommonModule,
    TranslateModule,
    ErrorMessageModule,
    ProjectComponent,

    // Materials
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule
  ]
})
export class ProjectModule {
}
