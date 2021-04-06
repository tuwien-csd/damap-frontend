import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'app-dmp-external-storage',
  templateUrl: './external-storage.component.html',
  styleUrls: ['./external-storage.component.css']
})
export class ExternalStorageComponent implements OnInit {

  @Input() externalStorageStep: FormArray;
  @Input() datasets: FormArray;
  @Input() externalStorageInfo: FormControl = new FormControl();

  @Output() externalStorageToAdd = new EventEmitter();
  @Output() externalStorageToRemove = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  addExternalStorage() {
    this.externalStorageToAdd.emit();
  }

  removeExternalStorage(index: number) {
    this.externalStorageToRemove.emit(index);
  }


}
