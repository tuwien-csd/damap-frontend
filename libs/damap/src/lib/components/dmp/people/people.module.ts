import {ConfirmDeletionDialogComponent, PeopleComponent} from './people.component';

import {ContributorFilterPipe} from './contributor-filter.pipe';
import {ContributorManualComponent} from './contributor-manual/contributor-manual.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {NgModule} from '@angular/core';
import {OrcidModule} from '../../../widgets/orcid/orcid.module';
import {PersonSearchModule} from '../../../widgets/person-search/person-search.module';
import {SharedModule} from '../../../shared/shared.module';
import {StepIntroModule} from '../../../widgets/step-intro/step-intro.module';

@NgModule({
  imports: [
    SharedModule,
    StepIntroModule,
    OrcidModule,
    PersonSearchModule,

    // Materials
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [PeopleComponent, ContributorManualComponent, ContributorFilterPipe, ConfirmDeletionDialogComponent],
  exports: [
    SharedModule,
    StepIntroModule,
    OrcidModule,
    PersonSearchModule,
    PeopleComponent,

    // Materials
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class PeopleModule {
}
