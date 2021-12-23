import {createAction, props} from '@ngrx/store';
import {Dmp} from '../../domain/dmp';

export enum FormActionTypes {
  SetForm = '[Form] Set value',
  FormDiff = '[Form] Diff',
  ResetForm = '[Form] Reset value'
}

export const setFormValue = createAction(FormActionTypes.SetForm, props<{ dmp: Dmp }>());

export const formDiff = createAction(FormActionTypes.FormDiff, props<{ newDmp: Dmp }>());

export const resetFormValue = createAction(FormActionTypes.ResetForm);
