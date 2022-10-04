import {Component, Inject} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FILE_SIZES, FILE_TYPES} from '../data-specs';
import {FormService} from '../../../../services/form.service';
import {Dataset} from '../../../../domain/dataset';
import {DataSource} from '../../../../domain/enum/data-source.enum';
import {IdentifierType} from '../../../../domain/enum/identifier-type.enum';
import {Identifier} from '../../../../domain/identifier';

@Component({
  selector: 'app-dataset-dialog',
  templateUrl: './dataset-dialog.component.html',
  styleUrls: ['./dataset-dialog.component.css']
})
export class DatasetDialogComponent {

  readonly FILE_TYPES = FILE_TYPES;
  readonly FILE_SIZES = FILE_SIZES;
  readonly datasetSource: any = DataSource;
  readonly identifierType: any = IdentifierType;

  mode = 'add';
  dataset: UntypedFormGroup = this.formService.createDatasetFormGroup(this.data.dataset.title);
  datasetId: Identifier = {
    identifier: undefined,
    type: undefined
  }

  originalOrder = (): number => 0;

  constructor(
    public dialogRef: MatDialogRef<DatasetDialogComponent>,
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public data: { dataset: Dataset, mode: string }) {
    this.dataset.patchValue(data.dataset);
    this.mode = data.mode ?? this.mode;
    if (data.dataset.datasetId) {
      this.datasetId = data.dataset.datasetId;
    }
  }

  get title(): UntypedFormControl {
    return this.dataset.get('title') as UntypedFormControl;
  }

  get description(): UntypedFormControl {
    return this.dataset.get('description') as UntypedFormControl;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDialogClose() {
    const dataset: Dataset = this.dataset.getRawValue();
    if (dataset.source == this.datasetSource.REUSED &&
      (this.datasetId.identifier != null || this.datasetId.type != null)) {
      dataset.datasetId = this.datasetId;
    }
    this.dialogRef.close(dataset);
  }
}
