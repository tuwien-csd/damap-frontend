import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TU_STORAGE} from './storage-list';
import {FormArray, FormGroup} from '@angular/forms';
import {Storage} from '../../../domain/storage';
import {AccessRight} from '../../../domain/enum/access-right';

@Component({
  selector: 'app-dmp-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  @Input() dmpForm: FormGroup;
  @Input() storageStep: FormArray;
  @Input() datasets: FormArray;

  @Output() storageToAdd = new EventEmitter<Storage>();
  @Output() storageToRemove = new EventEmitter<number>();

  @Output() accessRightToAdd = new EventEmitter<any>();
  @Output() accessRightToRemove = new EventEmitter<any>();

  storage: Storage[] = TU_STORAGE;

  accessRight = AccessRight;

  constructor() {
  }

  ngOnInit(): void {
  }

  getAccessRights(index: number) {
    return this.storageStep.at(index).get('accessRights') as FormArray;
  }

  getDatasetTitle(hash: string) {
    return this.datasets.value.find(item => item.referenceHash === hash).title;
  }

  addStorage(storage: Storage) {
    this.storageToAdd.emit(storage);
  }

  removeStorage(index: number) {
    this.storageToRemove.emit(index);
  }

  onSelectChange(index: number) {
    const storage = (this.storageStep.at(index) as FormGroup).value;
    if (storage.datasets.length > storage.accessRights.length) {
      this.addDatasetAccessRight(index);
    } else if (storage.datasets.length < storage.accessRights.length) {
      this.removeDatasetAccessRight(index);
    }
  }

  private addDatasetAccessRight(index: number) {
    this.accessRightToAdd.emit(index);
  }

  private removeDatasetAccessRight(index: number) {
    this.accessRightToRemove.emit(index);
  }

}
