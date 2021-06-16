import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProjectState} from '../states/project.state';

export const selectProjectsState = createFeatureSelector<ProjectState>('projects');

export const selectProjectsLoaded = createSelector(
  selectProjectsState,
  projectsState => projectsState.loaded
);

export const selectProjects = createSelector(
  selectProjectsState,
  projectsState => projectsState.projects
);
