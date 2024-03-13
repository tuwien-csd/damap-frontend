import * as DmpAction from '../actions/dmp.actions';

import { adapter, initialDmpState } from '../states/dmp.state';
import { createReducer, on } from '@ngrx/store';

import { LoadingState } from '../../domain/enum/loading-state.enum';

export const dmpReducer = createReducer(
  initialDmpState,
  on(DmpAction.loadDmps, (state, { skipIfPresent }) => {
    return skipIfPresent && state.loaded !== LoadingState.NOT_LOADED
      ? { ...state }
      : { ...state, loaded: LoadingState.LOADING };
  }),
  on(DmpAction.dmpsLoaded, (state, { dmps }) => {
    return adapter.setAll(dmps, { ...state, loaded: LoadingState.LOADED });
  }),
  on(DmpAction.failedToLoadDmps, state => ({
    ...state,
    loaded: LoadingState.FAILED,
  })),
  on(
    DmpAction.createDmp,
    DmpAction.updateDmp,
    DmpAction.exportDmpTemplate,
    (state, _) => {
      return { ...state, saving: true };
    }
  ),
  on(
    DmpAction.dmpSaved,
    DmpAction.failedToSaveDmp,
    DmpAction.dmpExported,
    state => ({ ...state, saving: false })
  ),
  on(DmpAction.deleteDmp, (state, { id }) =>
    adapter.removeOne(id, { ...state })
  )
);
