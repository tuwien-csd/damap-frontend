import {NgModule} from '@angular/core';
import {LicenseSelectorDialogComponent, LicenseWizardComponent} from './license-wizard.component';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {LicenseFilterPipe} from './license-filter.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,

    // Materials
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule
  ],
  declarations: [LicenseWizardComponent, LicenseSelectorDialogComponent, LicenseFilterPipe],
  exports: [
    CommonModule,
    TranslateModule,
    LicenseWizardComponent,

    // Materials
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule
  ]
})
export class LicenseWizardModule {
}
