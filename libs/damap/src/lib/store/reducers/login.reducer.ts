import {Action, createReducer, on} from "@ngrx/store";
import {initialState, LoginState} from "../states/login.state"
import * as LoginActions from '../actions/login.actions';

function setToken(state, auth) {
  let parts:string[] = auth.token.split('.');
  let tokenBody:any = JSON.parse(atob(parts[1]));
  return {...state, token: auth.token, roles: tokenBody.realm_access.roles, username: tokenBody.preferred_username};
}

const loginReducer = createReducer(
  initialState,
  on(LoginActions.login, setToken)
);

export function reducer(state:LoginState | undefined, action: Action) {
  return loginReducer(state, action);
}
