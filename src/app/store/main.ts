import {ActionReducerMap} from '@ngrx/store';
import * as fromLogin from './reducers/login.reducer';
import {environment} from '../../environments/environment';
import {AppState} from './states/app.state';
import {projectReducer} from './reducers/project.reducer';
import {dmpReducer} from './reducers/dmp.reducer';
import {repositoryReducer} from './reducers/repository.reducer';

export const reducers: ActionReducerMap<AppState> = {
  login: fromLogin.reducer,
  dmps: dmpReducer,
  projects: projectReducer,
  repositories: repositoryReducer
};

export const config = {
  metaReducers: !environment.production ? [] : [],
  runtimeChecks: {
    strictStateImmutability: true,
    strictActionImmutability: true,
  }
};
