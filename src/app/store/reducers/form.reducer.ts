import {initialFormState} from '../states/form.state';
import {createReducer, on} from '@ngrx/store';
import {formDiff, resetFormValue, setFormValue} from '../actions/form.actions';

export const formReducer = createReducer(
  initialFormState,
  on(setFormValue, (state, {dmp}) => ({...state, dmp, changed: false})),
  on(formDiff, (state, {newDmp}) => ({...state, changed: !equals(state.dmp, newDmp)})),
  on(resetFormValue, _ => (initialFormState))
);

export function equals(a, b) {
  if ((a == null && b != null) || (a != null && b == null)) {
    return false;
  }
  if (a == null && b == null) {
    return true;
  }

  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for (const key of Object.keys(a)) {
    const aValue = a[key];
    const bValue = b[key];
    if ((aValue instanceof Object && !equals(aValue, bValue)) || (!(aValue instanceof Object) && aValue !== bValue)) {
      return false;
    }
  }
  return true;
}
