import {adapter, initialDmpState} from '../states/dmp.state';
import * as DmpAction from '../actions/dmp.actions';
import {LoadingState} from '../../domain/enum/loading-state.enum';
import {createReducer, on} from '@ngrx/store';

export const dmpReducer = createReducer(
  initialDmpState,
  on(DmpAction.loadDmps, (state, {skipIfPresent}) => {
    return skipIfPresent && state.loaded !== LoadingState.NOT_LOADED ? ({...state}) : ({...state, loaded: LoadingState.LOADING})
  }),
  on(DmpAction.dmpsLoaded, (state, {dmps}) => {
    return adapter.setAll(dmps, {...state, loaded: LoadingState.LOADED})
  }),
  on(DmpAction.failedToLoadDmps, state => ({...state, loaded: LoadingState.FAILED})),
  on(DmpAction.createDmp, (state, _) => {
    return ({...state, saving: true})
  }),
  on(DmpAction.updateDmp, (state, _) => {
    return ({...state, saving: true})
  }),
  on(DmpAction.dmpSaved, state => ({...state, saving: false})),
  on(DmpAction.failedToSaveDmp, state => ({...state, saving: false})),
  on(DmpAction.exportDmp, (state, _) => ({...state, saving: true})),
  on(DmpAction.dmpExported, state => ({...state, saving: false}))
);
