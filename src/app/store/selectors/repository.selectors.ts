import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRepositories from '../reducers/repository.reducer';
import {RepositoryState} from '../states/repository.state';

export const selectRepositoryState = createFeatureSelector<RepositoryState>('repositories');

export const selectRepositoriesLoaded = createSelector(
  selectRepositoryState,
  repositoriesState => repositoriesState.loaded
);

export const selectRepositories = createSelector(
  selectRepositoryState,
  fromRepositories.selectAll
);
