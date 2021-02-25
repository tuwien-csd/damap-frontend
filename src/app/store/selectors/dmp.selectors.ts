import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DmpState} from '../states/dmp.state';
import * as fromDmps from '../reducers/dmp.reducer';

export const selectDmpsState = createFeatureSelector<DmpState>('dmps');

export const selectDmpsLoaded = createSelector(
  selectDmpsState,
  dmpsState => dmpsState.loaded
);

export const selectDmps = createSelector(
  selectDmpsState,
  fromDmps.selectAll
);
