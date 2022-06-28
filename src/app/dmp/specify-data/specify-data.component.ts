import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractBaseDataComponent} from './abstract-base-data.component';

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

  readonly tableHeaders: string[] = ['dataset', 'datatype', 'size', 'description', 'actions'];

  constructor() {
    super();
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
