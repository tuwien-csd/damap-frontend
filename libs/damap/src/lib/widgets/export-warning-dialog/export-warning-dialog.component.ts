import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'damap-export-warning-dialog',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatDialogModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>{{'export.dialog.title' | translate}}</h1>
    <div mat-dialog-content>{{'export.dialog.content' | translate}}</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close="true">{{'export.dialog.button' | translate}}</button>
    </div>
  `
})
export class ExportWarningDialogComponent {
}
