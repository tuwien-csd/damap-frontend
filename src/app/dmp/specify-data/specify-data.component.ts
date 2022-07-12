import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractBaseDataComponent} from './abstract-base-data.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-dmp-specify-data',
  templateUrl: './specify-data.component.html',
  styleUrls: ['./specify-data.component.css']
})
export class SpecifyDataComponent extends AbstractBaseDataComponent {

  @Input() fileUpload: { file: File, progress: number, finalized: boolean }[];

  @Output() createDataset = new EventEmitter<string>();
  @Output() fileToAnalyse = new EventEmitter<File>();
  @Output() uploadToCancel = new EventEmitter<number>();

  constructor() {
    super();
  }

  get explanation(): FormControl {
    return this.specifyDataStep.get('explanation') as FormControl;
  }

  analyseFile(file: File) {
    this.fileToAnalyse.emit(file);
  }

  cancelUpload(index: number) {
    this.uploadToCancel.emit(index);
  }

  create(datasetName: string): void {
    this.createDataset.emit(datasetName);
  }
}
