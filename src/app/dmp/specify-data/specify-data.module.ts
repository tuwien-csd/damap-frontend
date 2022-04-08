import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {DatasetDialogComponent, SpecifyDataComponent} from './specify-data.component';
import {FileUploadModule} from '../../widgets/file-upload/file-upload.module';
import {StepIntroModule} from '../../widgets/step-intro/step-intro.module';
import {ByteModule} from '../../pipe/byte/byte.module';
import {SharedModule} from '../../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    FileUploadModule,
    StepIntroModule,
    ByteModule,
    SharedModule,

    // Materials
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatChipsModule,
    MatTableModule,
  ],
  declarations: [SpecifyDataComponent, DatasetDialogComponent],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FileUploadModule,
    StepIntroModule,
    ByteModule,
    SharedModule,
    SpecifyDataComponent,

    // Materials
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatChipsModule,
    MatTableModule,
  ]
})
export class SpecifyDataModule {
}
