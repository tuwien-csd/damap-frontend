import {adapter, DmpState, initialDmpState} from '../states/dmp.state';
import {DmpActions, DmpActionTypes} from '../actions/dmp.actions';

export function dmpReducer(
  state = initialDmpState,
  action: DmpActions): DmpState {
  switch (action.type) {
    case DmpActionTypes.LoadDmps:
      return state;
    case DmpActionTypes.DmpsLoaded: {
      return adapter.setAll(action.payload.dmps, {
        ...state,
        loaded: true
      });
    }
    default: {
      return state;
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
