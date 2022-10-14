import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormArray, UntypedFormGroup} from '@angular/forms';
import {InternalStorage} from '../../../../domain/internal-storage';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../store/states/app.state';
import {LoadingState} from '../../../../domain/enum/loading-state.enum';
import {
  selectInternalStorages,
  selectInternalStoragesLoaded
} from '../../../../store/selectors/internal-storage.selectors';
import {loadInternalStorages} from '../../../../store/actions/internal-storage.actions';

@Component({
  selector: 'app-dmp-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  @Input() dmpForm: UntypedFormGroup;
  @Input() storageStep: UntypedFormArray;
  @Input() datasets: UntypedFormArray;

  @Output() storageToAdd = new EventEmitter<InternalStorage>();
  @Output() storageToRemove = new EventEmitter<number>();

  internalStorages: InternalStorage[] = [];
  internalStoragesLoaded: LoadingState;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(selectInternalStoragesLoaded)).subscribe(val => this.internalStoragesLoaded = val);
    this.store.pipe(select(selectInternalStorages)).subscribe(val => this.internalStorages = val);
    this.getInternalStorages();
  }

  addStorage(storage: InternalStorage) {
    this.storageToAdd.emit(storage);
  }

  removeStorage(index: number) {
    this.storageToRemove.emit(index);
  }

  private getInternalStorages() {
    if (this.internalStoragesLoaded !== LoadingState.LOADED) {
      this.store.dispatch(loadInternalStorages());
    }
  }
}
