import {Component, Inject, Input} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ETemplateType } from '../../domain/enum/export-template-type.enum';
import { FormService } from '../../services/form.service';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'damap-export-warning-dialog',
  templateUrl: './export-warning-dialog.html',
  styleUrls: ['./export-warning-dialog.css'],
})

export class ExportWarningDialogComponent {
  @Input() dmpForm: UntypedFormGroup;
  @Input() project: UntypedFormGroup
  
  template: any = ETemplateType;


  constructor(public dialogRef: MatDialogRef<ExportWarningDialogComponent>) {
  }

  closeDialog() {
    // eslint-disable-next-line no-console
    // console.log("SECOND", this.template);
    this.dialogRef.close(this.template);
  }
}

