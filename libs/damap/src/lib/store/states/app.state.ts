import {LoginState} from './login.state';
import {ProjectState} from './project.state';
import {DmpState} from './dmp.state';
import {RepositoryState} from './repository.state';
import {FormState} from './form.state';
import {InternalStorageState} from './internal-storage.state';
import {createFeatureSelector} from '@ngrx/store';

export interface AppState {
  login: LoginState,
  form: FormState,
  dmps: DmpState,
  projects: ProjectState,
  repositories: RepositoryState,
  internalStorages: InternalStorageState
}

export const selectDamapState = createFeatureSelector<AppState>('damap');
