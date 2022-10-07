import {initialProjectsState, ProjectState} from '../states/project.state';
import {ProjectActions, ProjectActionTypes} from '../actions/project.actions';
import {LoadingState} from '../../domain/enum/loading-state.enum';

export function projectReducer(
  state = initialProjectsState,
  action: ProjectActions): ProjectState {
  switch (action.type) {
    case ProjectActionTypes.LoadProjects: {
      return {
        ...state,
        loaded: LoadingState.LOADING
      };
    }
    case ProjectActionTypes.ProjectsLoaded: {
      return {
        ...state,
        projects: action.payload.projects,
        loaded: LoadingState.LOADED
      };
    }
    case ProjectActionTypes.FailedToLoadProjects: {
      return {
        ...state,
        loaded: LoadingState.FAILED
      };
    }
    default: {
      return state;
    }
  }
}
