import {NgModule} from '@angular/core';
import {PeopleComponent} from './people.component';
import {ContributorManualComponent} from './contributor-manual/contributor-manual.component';
import {StepIntroModule} from '../../widgets/step-intro/step-intro.module';
import {MatCardModule} from '@angular/material/card';
import {OrcidModule} from '../../widgets/orcid/orcid.module';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {ContributorFilterPipe} from './contributor-filter.pipe';
import {SharedModule} from '../../shared/shared.module';
import {PersonSearchModule} from '../../widgets/person-search/person-search.module';

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
  ],
  declarations: [PeopleComponent, ContributorManualComponent, ContributorFilterPipe],
  exports: [
    SharedModule,
    StepIntroModule,
    OrcidModule,
    PersonSearchModule,
    PeopleComponent,

    // Materials
    MatCardModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class PeopleModule {
}
