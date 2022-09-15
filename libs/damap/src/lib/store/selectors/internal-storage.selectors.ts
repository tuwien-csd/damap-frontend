import {createSelector} from '@ngrx/store';
import {adapter} from '../states/internal-storage.state';
import {AppState, selectDamapState} from '../states/app.state';

const {
  selectAll
} = adapter.getSelectors();

export const selectInternalStorageState = createSelector(selectDamapState, (state: AppState) => state.internalStorages);

export const selectInternalStoragesLoaded = createSelector(
  selectInternalStorageState,
  internalStorageState => internalStorageState.loaded
);

export const selectInternalStorages = createSelector(
  selectInternalStorageState,
  selectAll
);
