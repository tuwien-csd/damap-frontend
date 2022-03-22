import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, DmpState} from '../states/dmp.state';

export const {
  selectAll
} = adapter.getSelectors();

export const selectDmpsState = createFeatureSelector<DmpState>('dmps');

export const selectDmpsLoaded = createSelector(
  selectDmpsState,
  dmpsState => dmpsState.loaded
);

export const selectDmps = createSelector(
  selectDmpsState,
  selectAll
);

export const selectDmpById = (props: { id: number }) => createSelector(
  selectDmpsState,
  (state) => state.entities[props.id]
)
