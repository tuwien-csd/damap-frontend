import {LoginState} from './login.state';
import {ProjectState} from './project.state';
import {DmpState} from './dmp.state';
import {RepositoryState} from './repository.state';

export interface AppState {
  login: LoginState,
  dmps: DmpState,
  projects: ProjectState,
  repositories: RepositoryState
}
