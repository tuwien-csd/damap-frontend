import {createSelector} from '@ngrx/store';
import {AppState, selectDamapState} from '../states/app.state';

export const selectFormState = createSelector(selectDamapState, (state: AppState) => state.form);

export const selectForm = createSelector(
  selectFormState,
  formState => formState.dmp
);

export const selectFormChanged = createSelector(
  selectFormState,
  formState => formState.changed
);

export const selectFormContact = createSelector(
  selectFormState,
  formState => formState.dmp.contributors?.find(c => c.contact)
);
