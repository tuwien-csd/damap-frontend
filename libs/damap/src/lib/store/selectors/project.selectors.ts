import {createSelector} from '@ngrx/store';
import {AppState, selectDamapState} from '../states/app.state';

export const selectProjectsState = createSelector(selectDamapState, (state: AppState) => state.projects);

export const selectProjectsLoaded = createSelector(
  selectProjectsState,
  projectsState => projectsState.loaded
);

export const selectProjects = createSelector(
  selectProjectsState,
  projectsState => projectsState.projects
);
