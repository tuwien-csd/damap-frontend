import {adapter, initialRepositoryState, RepositoryState} from '../states/repository.state';
import {RepositoryActions, RepositoryActionTypes} from '../actions/repository.actions';

export function repositoryReducer(
  state = initialRepositoryState,
  action: RepositoryActions): RepositoryState {
  switch (action.type) {
    case RepositoryActionTypes.LoadRepositories:
      return state;
    case RepositoryActionTypes.RepositoriesLoaded: {
      return adapter.setAll(action.payload.repositories, {
        ...state,
        loaded: true
      });
    }
    case RepositoryActionTypes.UpdateRepository: {
      return adapter.updateOne(action.payload.update, state);
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
