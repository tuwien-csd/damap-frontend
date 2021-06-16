import {Project} from '../../domain/project';
import {LoadingState} from '../../domain/enum/loading-state.enum';

export interface ProjectState {
  projects: Project[];
  loaded: LoadingState;
}

export const initialProjectsState: ProjectState = {
  projects: [],
  loaded: LoadingState.NOT_LOADED
};

