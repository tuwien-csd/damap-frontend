import {CommonModule} from '@angular/common';
import { ExportWarningDialogComponent } from './export-warning-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, 
    TranslateModule,
    FormsModule,

    // Materials
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
],
  declarations: [ExportWarningDialogComponent],
  exports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    ExportWarningDialogComponent,
  ]
})
export class ExportWarningModule {
}
