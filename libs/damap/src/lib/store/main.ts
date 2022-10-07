import {ActionReducerMap} from '@ngrx/store';
import * as fromLogin from './reducers/login.reducer';
import {AppState} from './states/app.state';
import {projectReducer} from './reducers/project.reducer';
import {dmpReducer} from './reducers/dmp.reducer';
import {repositoryReducer} from './reducers/repository.reducer';
import {formReducer} from './reducers/form.reducer';
import {internalStorageReducer} from './reducers/internal-storage.reducer';
import {APP_ENV} from '../constants';

export const reducers: ActionReducerMap<AppState> = {
  login: fromLogin.reducer,
  form: formReducer,
  dmps: dmpReducer,
  projects: projectReducer,
  repositories: repositoryReducer,
  internalStorages: internalStorageReducer
};

export const config = {
  metaReducers: !APP_ENV.production ? [] : [],
  runtimeChecks: {
    strictStateImmutability: true,
    strictActionImmutability: true,
  }
};
