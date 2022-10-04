import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {AbstractBaseDataComponent} from '../abstract-base-data.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-created-data',
  templateUrl: './created-data.component.html',
  styleUrls: ['./created-data.component.css']
})
export class CreatedDataComponent extends AbstractBaseDataComponent {

  @Input() fileUpload: { file: File, progress: number, finalized: boolean }[];

  @Output() createDataset = new EventEmitter<string>();
  @Output() fileToAnalyse = new EventEmitter<File>();
  @Output() uploadToCancel = new EventEmitter<number>();

  readonly tableHeaders: string[] = ['dataset', 'datatype', 'size', 'description', 'actions'];

  // Mat Chip properties
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() {
    super();
  }

  addDataset(event: MatChipInputEvent): void {
    const value = event.value;

    // Add dataset
    if ((value || '').trim()) {
      this.createDataset.emit(value);
    }

    // Reset the input value
    event.chipInput?.clear();
  }

  get kind(): UntypedFormControl {
    return this.specifyDataStep.get('kind') as UntypedFormControl;
  }

  analyseFile(file: File) {
    this.fileToAnalyse.emit(file);
  }

  cancelUpload(index: number) {
    this.uploadToCancel.emit(index);
  }
}
