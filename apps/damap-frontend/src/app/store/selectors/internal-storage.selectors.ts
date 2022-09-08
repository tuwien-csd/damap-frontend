import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, InternalStorageState} from '../states/internal-storage.state';

export const {
  selectAll
} = adapter.getSelectors();

export const selectInternalStorageState = createFeatureSelector<InternalStorageState>('internalStorages');

export const selectInternalStoragesLoaded = createSelector(
  selectInternalStorageState,
  internalStorageState => internalStorageState.loaded
);

export const selectInternalStorages = createSelector(
  selectInternalStorageState,
  selectAll
);
