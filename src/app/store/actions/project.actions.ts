import {Action} from '@ngrx/store';
import {Project} from '../../domain/project';

export enum ProjectActionTypes {
  LoadSuggestedProjects = '[Projects] Load Suggested Projects',
  SuggestedProjectsLoaded = '[Projects] Suggested Projects Loaded',
}

export class LoadSuggestedProjects implements Action {
  readonly type = ProjectActionTypes.LoadSuggestedProjects;

  constructor(public payload: { userId: string }) {
  }
}

export class SuggestedProjectsLoaded implements Action {
  readonly type = ProjectActionTypes.SuggestedProjectsLoaded;

  constructor(public payload: { projects: Project[] }) {
  }
}

export type ProjectActions =
  LoadSuggestedProjects
  | SuggestedProjectsLoaded;
