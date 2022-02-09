import {adapter, initialRepositoryState, RepositoryState} from '../states/repository.state';
import {RepositoryActions, RepositoryActionTypes} from '../actions/repository.actions';
import {LoadingState} from '../../domain/enum/loading-state.enum';

export function repositoryReducer(
  state = initialRepositoryState,
  action: RepositoryActions): RepositoryState {
  switch (action.type) {
    case RepositoryActionTypes.LoadAllRepositories:
      return {
        ...state,
        filters: null,
        loaded: LoadingState.LOADING
      };
    case RepositoryActionTypes.RepositoriesLoaded: {
      return adapter.setAll(action.payload.repositories, {
        ...state,
        loaded: LoadingState.LOADED
      });
    }
    case RepositoryActionTypes.UpdateRepository: {
      return adapter.updateOne(action.payload.update, state);
    }
    case RepositoryActionTypes.FailedToLoadRepositories: {
      return {
        ...state,
        loaded: LoadingState.FAILED
      }
    }
    case RepositoryActionTypes.SetRepositoryFilter: {
      return {
        ...state,
        loaded: LoadingState.LOADING,
        filters: {
          ...state.filters,
          [action.payload.filter.name]: action.payload.filter.value
        }
      }
    }
    default: {
      return state;
    }
  }
}

export const {
  selectAll
} = adapter.getSelectors();
