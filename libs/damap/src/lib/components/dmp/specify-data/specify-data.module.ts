import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SpecifyDataComponent} from './specify-data.component';
import {FileUploadModule} from '../../../widgets/file-upload/file-upload.module';
import {StepIntroModule} from '../../../widgets/step-intro/step-intro.module';
import {ByteModule} from '../../../pipes/byte/byte.module';
import {SharedModule} from '../../../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {ReusedDataComponent} from './reused-data/reused-data.component';
import {CreatedDataComponent} from './created-data/created-data.component';
import {DoiSearchModule} from '../../../widgets/doi-search/doi-search.module';
import {DatasetSourceModule} from '../../../pipes/dataset-source/dataset-source.module';
import {DatasetDialogComponent} from './dataset-dialog/dataset-dialog.component';
import {DatasetTableComponent} from './dataset-table/dataset-table.component';
import {DataMcComponent} from './data-mc/data-mc.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    FileUploadModule,
    StepIntroModule,
    ByteModule,
    SharedModule,
    DatasetSourceModule,
    DoiSearchModule,

    // Materials
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatChipsModule,
    MatTableModule,
  ],
  declarations: [
    SpecifyDataComponent,
    DatasetDialogComponent,
    CreatedDataComponent,
    ReusedDataComponent,
    DatasetTableComponent,
    DataMcComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FileUploadModule,
    StepIntroModule,
    ByteModule,
    SharedModule,
    SpecifyDataComponent,
    DoiSearchModule,

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
