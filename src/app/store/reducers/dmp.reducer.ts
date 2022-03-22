import {adapter, initialDmpState} from '../states/dmp.state';
import * as DmpAction from '../actions/dmp.actions';
import {LoadingState} from '../../domain/enum/loading-state.enum';
import {createReducer, on} from '@ngrx/store';

export const dmpReducer = createReducer(
  initialDmpState,
  on(DmpAction.loadDmps, (state, {skipIfPresent}) => {
    return skipIfPresent ? ({...state}) : ({...state, loaded: LoadingState.LOADING})
  }),
  on(DmpAction.dmpsLoaded, (state, {dmps}) => {
    return adapter.setAll(dmps, {...state, loaded: LoadingState.LOADED})
  }),
  on(DmpAction.failedToLoadDmps, state => ({...state, loaded: LoadingState.FAILED}))
);
