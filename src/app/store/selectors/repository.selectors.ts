import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, RepositoryState} from '../states/repository.state';

export const {
  selectAll
} = adapter.getSelectors();

export const selectRepositoryState = createFeatureSelector<RepositoryState>('repositories');

export const selectRecommendedRepositories = createSelector(
  selectRepositoryState,
  (state: RepositoryState) => state.recommended
);

export const selectRecommendedRepositoriesLoaded = createSelector(
  selectRepositoryState,
  (state: RepositoryState) => state.recommendedLoaded
);

export const selectRepositoriesLoaded = createSelector(
  selectRepositoryState,
  repositoriesState => repositoriesState.loaded
);

export const selectRepositories = createSelector(
  selectRepositoryState,
  selectAll
);

export const selectFilters = createSelector(
  selectRepositoryState,
  (state: RepositoryState) => state.filters
);
