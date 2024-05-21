import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { InputWrapperComponent } from './input-wrapper/input-wrapper.component';
import { LegalAspectsDialogInfoComponent } from './question-dialogs/legal-aspects-dialog-info.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MetadataDialogInfoComponent } from './question-dialogs/metadata-dialog-info.component';
import { NgModule } from '@angular/core';
import { TextareaWrapperComponent } from './textarea-wrapper/textarea-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationDialogInfoComponent } from './question-dialogs/validation-dialog-info.component';

@NgModule({
  declarations: [
    InputWrapperComponent,
    TextareaWrapperComponent,
    MetadataDialogInfoComponent,
    LegalAspectsDialogInfoComponent,
    ValidationDialogInfoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatDialogModule,

    // Materials
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    InputWrapperComponent,
    TextareaWrapperComponent,
    MetadataDialogInfoComponent,
    ValidationDialogInfoComponent,
    LegalAspectsDialogInfoComponent,

    // Materials
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
})
export class SharedModule {}
