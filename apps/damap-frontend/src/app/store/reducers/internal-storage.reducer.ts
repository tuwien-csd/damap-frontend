import {createReducer, on} from '@ngrx/store';
import {adapter, initialInternalStorageState} from '../states/internal-storage.state';
import * as InternalStorageAction from '../actions/internal-storage.actions';
import {LoadingState} from '../../domain/enum/loading-state.enum';

export const internalStorageReducer = createReducer(
  initialInternalStorageState,
  on(InternalStorageAction.loadInternalStorages, state => ({...state, loaded: LoadingState.LOADING})),
  on(InternalStorageAction.internalStoragesLoaded, (state, {internalStorages}) => {
    return adapter.setAll(internalStorages, {...state, loaded: LoadingState.LOADED})
  }),
  on(InternalStorageAction.failedToLoadInternalStorages, state => ({...state, loaded: LoadingState.FAILED}))
);
