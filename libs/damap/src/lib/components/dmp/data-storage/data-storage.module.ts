import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataAccessComponent} from './data-access/data-access.component';
import {ExternalStorageComponent} from './external-storage/external-storage.component';
import {StorageComponent} from './storage/storage.component';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {SharedModule} from '../../../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {StepIntroModule} from '../../../widgets/step-intro/step-intro.module';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {StorageFilterPipe} from './storage/storage-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    StepIntroModule,

    // Materials
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [
    DataAccessComponent,
    ExternalStorageComponent,
    StorageComponent,
    StorageFilterPipe
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    StepIntroModule,
    DataAccessComponent,
    ExternalStorageComponent,
    StorageComponent,

    // Materials
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class DataStorageModule {
}
