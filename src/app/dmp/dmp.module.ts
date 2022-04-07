import {NgModule} from '@angular/core';
import {DmpComponent, SaveVersionDialogComponent} from './dmp.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {ReuseModule} from './reuse/reuse.module';
import {SummaryModule} from './summary/summary.module';
import {TagModule} from '../widgets/tag/tag.module';
import {InfoMessageModule} from '../widgets/info-message/info-message.module';
import {SaveStatusModule} from '../widgets/save-status/save-status.module';
import {CostsModule} from './costs/costs.module';
import {DataDeletionModule} from './data-deletion/data-deletion.module';
import {DataStorageModule} from './data-storage/data-storage.module';
import {DocDataQualityModule} from './doc-data-quality/doc-data-quality.module';
import {LegalEthicalAspectsModule} from './legal-ethical-aspects/legal-ethical-aspects.module';
import {LicensesModule} from './licenses/licenses.module';
import {PeopleModule} from './people/people.module';
import {ProjectModule} from './project/project.module';
import {RepoModule} from './repo/repo.module';
import {SpecifyDataModule} from './specify-data/specify-data.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {LicenseWizardModule} from '../widgets/license-wizard/license-wizard.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TreeSelectFormFieldModule} from '../widgets/tree-select-form-field/tree-select-form-field.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatTreeModule} from '@angular/material/tree';
import {ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {CrisTagModule} from '../widgets/cris-tag/cris-tag.module';
import {TooltipModule} from '../widgets/tooltip/tooltip.module';
import {OrcidModule} from '../widgets/orcid/orcid.module';
import {MatListModule} from '@angular/material/list';
import {ErrorMessageModule} from '../widgets/error-message/error-message.module';
import {MatTabsModule} from '@angular/material/tabs';
import {ByteModule} from '../pipe/byte/byte.module';
import {FileUploadModule} from '../widgets/file-upload/file-upload.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,

    // Widgets
    SaveStatusModule,

    // Steps
    ProjectModule,
    PeopleModule,
    SpecifyDataModule,
    DocDataQualityModule,
    LegalEthicalAspectsModule,
    DataStorageModule,
    LicensesModule,
    DataDeletionModule,
    RepoModule,
    ReuseModule,
    CostsModule,
    SummaryModule,

    // Materials
    MatStepperModule,
  ],
  declarations: [DmpComponent, SaveVersionDialogComponent],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    DmpComponent,

    // Widgets
    TagModule,
    InfoMessageModule,
    SaveStatusModule,
    CrisTagModule,
    TooltipModule,
    LicenseWizardModule,
    TreeSelectFormFieldModule,
    OrcidModule,
    ErrorMessageModule,
    ByteModule,
    FileUploadModule,

    // Materials
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatTreeModule,
    MatRadioModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatListModule,
    MatTabsModule,
    MatSelectModule

  ]
})
export class DmpModule {
}
