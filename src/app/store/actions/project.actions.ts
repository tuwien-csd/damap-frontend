import {Action} from '@ngrx/store';
import {Project} from '../../domain/project';

export enum ProjectActionTypes {
  LoadProjects = '[Projects] Load',
  ProjectsLoaded = '[Projects] Loaded',
  ProjectsFailedToLoad = '[Projects] Failed to load'
}

export class LoadProjects implements Action {
  readonly type = ProjectActionTypes.LoadProjects;

  constructor(public payload: { userId: string }) {
  }
}

export class ProjectsLoaded implements Action {
  readonly type = ProjectActionTypes.ProjectsLoaded;

  constructor(public payload: { projects: Project[] }) {
  }
}

export class ProjectsFailedToLoad implements Action {
  readonly type = ProjectActionTypes.ProjectsFailedToLoad;
}

export type ProjectActions =
  LoadProjects
  | ProjectsLoaded
  | ProjectsFailedToLoad;
