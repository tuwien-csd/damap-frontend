import {AppState} from "../states/app.state";
import {createSelector} from "@ngrx/store";

export const selectLogin = (state:AppState) => state.login;

export const selectToken = createSelector(
  selectLogin,
  login => login.token
);
