import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FormState} from '../states/form.state';

export const selectFormState = createFeatureSelector<FormState>('form');

export const selectFormChanged = createSelector(
  selectFormState,
  formState => formState.changed
);
