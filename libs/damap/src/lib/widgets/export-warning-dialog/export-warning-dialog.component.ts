import { Component, Input } from '@angular/core';

import { ETemplateType } from '../../domain/enum/export-template-type.enum';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../domain/project';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'damap-export-warning-dialog',
  templateUrl: './export-warning-dialog.html',
  styleUrls: ['./export-warning-dialog.css'],
})
export class ExportWarningDialogComponent {
  @Input() dmpForm: UntypedFormGroup;
  @Input() project: UntypedFormGroup;
  @Input() projectFunding: Project;

  dmpTemplate: any = ETemplateType;
  selectedTemplate = '';

  constructor(public dialogRef: MatDialogRef<ExportWarningDialogComponent>) {}

}
