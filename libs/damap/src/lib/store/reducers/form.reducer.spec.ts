import {initialFormState} from '../states/form.state';
import {equals, formReducer} from './form.reducer';
import {formDiff, setFormValue} from '../actions/form.actions';
import {completeDmp, noDataDmp} from '../../mocks/dmp-mocks';

describe('FormReducer', () => {
  it('should set form', () => {
    const state = formReducer(initialFormState, setFormValue({dmp: completeDmp}));

    expect(state.changed).toBeFalse();
    expect(state.dmp).toEqual(completeDmp);
  });

  it('should check form diff', () => {
    const state = formReducer({dmp: completeDmp, changed: false}, formDiff({newDmp: completeDmp}));
    expect(state.changed).toBeFalse();
    expect(state.dmp).toEqual(completeDmp);

    const newState = formReducer(state, formDiff({newDmp: noDataDmp}));
    expect(newState.changed).toBeTrue();
    expect(newState.dmp).toEqual(completeDmp);
  });

  it('should evaluate equals', () => {
    expect(equals(null, completeDmp)).toBeFalse();
    expect(equals(noDataDmp, completeDmp)).toBeFalse();
    expect(equals(completeDmp, completeDmp)).toBeTrue();
  });
});
