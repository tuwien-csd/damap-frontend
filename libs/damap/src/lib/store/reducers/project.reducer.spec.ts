import {initialProjectsState} from '../states/project.state';
import {LoadingState} from '../../domain/enum/loading-state.enum';
import {projectReducer} from './project.reducer';
import {FailedToLoadProjects, LoadProjects, ProjectsLoaded} from '../actions/project.actions';
import {mockProject} from '../../mocks/project-mocks';

describe('ProjectReducer', () => {
  it('should return failed loading state', () => {
    const state = projectReducer(initialProjectsState, new FailedToLoadProjects());

    expect(state.loaded).toBe(LoadingState.FAILED);
    expect(state.projects).toEqual(initialProjectsState.projects);
  });

  it('should return loading state', () => {
    const state = projectReducer(initialProjectsState, new LoadProjects());

    expect(state.loaded).toBe(LoadingState.LOADING);
    expect(state.projects).toEqual(initialProjectsState.projects);
  });

  it('should return loaded projects', () => {
    const state = projectReducer(initialProjectsState, new ProjectsLoaded({projects: [mockProject]}));

    expect(state.loaded).toBe(LoadingState.LOADED);
    expect(state.projects).toEqual([mockProject]);
  });
});
