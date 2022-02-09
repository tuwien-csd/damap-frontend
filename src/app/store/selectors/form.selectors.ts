import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FormState} from '../states/form.state';

export const selectFormState = createFeatureSelector<FormState>('form');

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
