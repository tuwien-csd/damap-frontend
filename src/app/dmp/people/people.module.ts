import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeopleComponent} from './people.component';
import {ContributorManualComponent} from './contributor-manual/contributor-manual.component';
import {StepIntroModule} from '../../widgets/step-intro/step-intro.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {OrcidModule} from '../../widgets/orcid/orcid.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ContributorFilterPipe} from './contributor-filter.pipe';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    StepIntroModule,
    OrcidModule,

    // Materials
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
  ],
  declarations: [PeopleComponent, ContributorManualComponent, ContributorFilterPipe],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    StepIntroModule,
    OrcidModule,
    PeopleComponent,

    // Materials
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class PeopleModule {
}
