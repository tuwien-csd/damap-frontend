import {createAction, props} from '@ngrx/store';
import {Dmp} from '../../domain/dmp';

export enum FormActionTypes {
  SetForm = '[Form] Set',
  FormLoaded = '[Form] Loaded',
  FailedToLoadForm = '[Form] Failed to load',
  FormDiff = '[Form] Diff'
}

export const setFormValue = createAction('[Form] Set value', props<{dmp: Dmp}>());

export const formDiff = createAction('[Form] Diff', props<{newDmp: Dmp}>());
