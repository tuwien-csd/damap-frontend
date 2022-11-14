import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractBaseDataComponent} from './abstract-base-data.component';
import {UntypedFormControl} from '@angular/forms';

@Component({
  selector: 'app-dmp-specify-data',
  templateUrl: './specify-data.component.html',
  styleUrls: ['./specify-data.component.css']
})
export class SpecifyDataComponent extends AbstractBaseDataComponent {

  @Input() fileUpload: { file: File, progress: number, finalized: boolean }[];

  @Output() fileToAnalyse = new EventEmitter<File>();
  @Output() uploadToCancel = new EventEmitter<number>();

  constructor() {
    super();
  }

  get dataGeneration(): UntypedFormControl {
    return this.specifyDataStep.get('dataGeneration') as UntypedFormControl;
  }

  get explanation(): UntypedFormControl {
    return this.specifyDataStep.get('explanation') as UntypedFormControl;
  }

  analyseFile(file: File) {
    this.fileToAnalyse.emit(file);
  }

  cancelUpload(index: number) {
    this.uploadToCancel.emit(index);
  }

}
