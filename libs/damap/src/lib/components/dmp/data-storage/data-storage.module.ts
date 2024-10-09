import { CommonModule } from '@angular/common';
import { DataAccessComponent } from './data-access/data-access.component';
import { DataStorageInstructionComponent } from './data-storage-instruction/data-storage-instruction.component';
import { ExternalStorageComponent } from './external-storage/external-storage.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { StepIntroModule } from '../../../widgets/step-intro/step-intro.module';
import { StorageComponent } from './storage/storage.component';
import { StorageFilterPipe } from './storage/storage-filter.pipe';
import { ToggleButtonsModule } from '../../../widgets/toggle-buttons/toggle-buttons.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    StepIntroModule,
    ToggleButtonsModule,

    // Materials
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  declarations: [
    DataAccessComponent,
    ExternalStorageComponent,
    StorageComponent,
    StorageFilterPipe,
    DataStorageInstructionComponent,
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
    DataStorageInstructionComponent,

    // Materials
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class DataStorageModule {}
