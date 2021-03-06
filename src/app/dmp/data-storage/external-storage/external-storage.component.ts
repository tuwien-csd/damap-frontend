import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dmp-external-storage',
  templateUrl: './external-storage.component.html',
  styleUrls: ['./external-storage.component.css']
})
export class ExternalStorageComponent {

  @Input() externalStorageStep: FormArray;
  @Input() datasets: FormArray;
  @Input() externalStorageInfo: FormControl = new FormControl();

  @Output() externalStorageToAdd = new EventEmitter();
  @Output() externalStorageToRemove = new EventEmitter<number>();

  constructor() {
  }

  getFormControl(index: number, controlName: string): FormControl {
    return (this.externalStorageStep?.at(index) as FormGroup)?.controls[controlName] as FormControl;
  }

  addExternalStorage() {
    this.externalStorageToAdd.emit();
  }

  removeExternalStorage(index: number) {
    this.externalStorageToRemove.emit(index);
  }

}
