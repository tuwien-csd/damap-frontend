import {Action} from '@ngrx/store';
import {Project} from '../../domain/project';

export enum ProjectActionTypes {
  LoadProjects = '[Projects] Load all',
  ProjectsLoaded = '[Projects] All loaded',
  FailedToLoadProjects = '[Projects] Failed to load all'
}

export class LoadProjects implements Action {
  readonly type = ProjectActionTypes.LoadProjects;
}

export class ProjectsLoaded implements Action {
  readonly type = ProjectActionTypes.ProjectsLoaded;

  constructor(public payload: { projects: Project[] }) {
  }
}

export class FailedToLoadProjects implements Action {
  readonly type = ProjectActionTypes.FailedToLoadProjects;
}

export type ProjectActions =
  LoadProjects
  | ProjectsLoaded
  | FailedToLoadProjects;
