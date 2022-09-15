import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {LicensesComponent} from './licenses.component';
import {LicenseWizardModule} from '../../../widgets/license-wizard/license-wizard.module';
import {StepIntroModule} from '../../../widgets/step-intro/step-intro.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DataDeletionModule} from '../data-deletion/data-deletion.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    LicenseWizardModule,
    StepIntroModule,
    DataDeletionModule,

    // Materials
    MatSelectModule,
    MatDatepickerModule,
  ],
  declarations: [LicensesComponent],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    LicenseWizardModule,
    StepIntroModule,
    DataDeletionModule,
    LicensesComponent,

    // Materials
    MatSelectModule,
    MatDatepickerModule,
  ]
})
export class LicensesModule {
}
