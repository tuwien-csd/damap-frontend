import {LoginState} from './login.state';
import {ProjectState} from './project.state';

export interface AppState {
  login: LoginState,
  projects: ProjectState
}
