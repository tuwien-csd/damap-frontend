import {Project} from '../../domain/project';

export interface ProjectState {
  projects: Project[];
  loaded: boolean;
}

export const initialProjectsState: ProjectState = {
  projects: [],
  loaded: false
};

