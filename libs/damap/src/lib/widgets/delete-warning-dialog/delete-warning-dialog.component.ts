import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'damap-delete-warning-dialog',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatDialogModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>{{'dialog.delete.title' | translate}}</h1>
    <div mat-dialog-content>{{'dialog.delete.content' | translate}}</div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">{{'dialog.delete.cancel' | translate}}</button>
      <button mat-button [mat-dialog-close]="true">{{'dialog.delete.button' | translate}}</button>
    </div>
  `
})
export class DeleteWarningDialogComponent {
}
