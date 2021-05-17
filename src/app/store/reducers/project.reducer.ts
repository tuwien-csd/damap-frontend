import {initialProjectsState, ProjectState} from '../states/project.state';
import {ProjectActions, ProjectActionTypes} from '../actions/project.actions';

export function projectReducer(
  state = initialProjectsState,
  action: ProjectActions): ProjectState {
  switch (action.type) {
    case ProjectActionTypes.LoadSuggestedProjects:
      return state;
    case ProjectActionTypes.SuggestedProjectsLoaded: {
      return {
        ...state,
        projects: action.payload.projects,
        loaded: true
      };
    }
    default: {
      return state;
    }
  }
}
