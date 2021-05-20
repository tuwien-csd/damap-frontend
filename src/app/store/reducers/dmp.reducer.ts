import {adapter, DmpState, initialDmpState} from '../states/dmp.state';
import {DmpActions, DmpActionTypes} from '../actions/dmp.actions';
import {LoadingState} from '../../domain/enum/loading-state.enum';

export function dmpReducer(
  state = initialDmpState,
  action: DmpActions): DmpState {
  switch (action.type) {
    case DmpActionTypes.LoadDmps:
      return {
        ...state,
        loaded: LoadingState.LOADING
      };
    case DmpActionTypes.DmpsLoaded: {
      return adapter.setAll(action.payload.dmps, {
        ...state,
        loaded: LoadingState.LOADED
      });
    }
    case DmpActionTypes.FailedToLoadDmps: {
      return {
        ...state,
        loaded: LoadingState.FAILED
      };
    }
    default: {
      return state;
    }
  }
}

export const {
  selectAll
} = adapter.getSelectors();
