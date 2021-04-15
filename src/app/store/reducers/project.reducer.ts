import {adapter, initialProjectsState, ProjectState} from '../states/project.state';
import {ProjectActions, ProjectActionTypes} from '../actions/project.actions';

export function projectReducer(
  state = initialProjectsState,
  action: ProjectActions): ProjectState {
  switch (action.type) {
    case ProjectActionTypes.LoadSuggestedProjects:
      return state;
    case ProjectActionTypes.SuggestedProjectsLoaded: {
      return adapter.setAll(action.payload.projects, {
        ...state,
        loaded: true
      });
    }
    default: {
      return state;
    }
  }
}


export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
