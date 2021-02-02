import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProjectState} from '../states/project.state';
import * as fromProjects from '../reducers/project.reducer';

export const selectProjectsState = createFeatureSelector<ProjectState>('projects');

export const selectProjectsLoading = createSelector(
  selectProjectsState,
  projectsState => projectsState.loaded
);

export const selectProjects = createSelector(
  selectProjectsState,
  fromProjects.selectAll
);
