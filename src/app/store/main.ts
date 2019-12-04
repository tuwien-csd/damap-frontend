import {ActionReducerMap} from '@ngrx/store';
import * as fromLogin from "./reducers/login.reducer";
import {environment} from "../../environments/environment";
import {AppState} from "./states/app.state";

export const reducers: ActionReducerMap<AppState> = {
  login: fromLogin.reducer
};

export const config = {
  metaReducers: !environment.production ? [] : [],
  runtimeChecks: {
    strictStateImmutability: true,
    strictActionImmutability: true,
  }
};
