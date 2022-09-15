import {createSelector} from '@ngrx/store';
import {adapter} from '../states/dmp.state';
import {AppState, selectDamapState} from '../states/app.state';

export const {
  selectAll
} = adapter.getSelectors();

export const selectDmpsState = createSelector(selectDamapState, (state: AppState) => state.dmps);

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

export const selectDmpSaving = createSelector(
  selectDmpsState,
  dmpsState => dmpsState.saving
);
