import {Action} from '@ngrx/store';
import {Repository} from '../../domain/repository';
import {Update} from '@ngrx/entity';

export enum RepositoryActionTypes {
  LoadRepositories = '[Repositories] Load Repositories',
  RepositoriesLoaded = '[Repositories] Repositories Loaded',
  LoadRepository = '[Repositories] Load entity',
  UpdateRepository = '[Repositories] Update entity'
}

export class LoadRepositories implements Action {
  readonly type = RepositoryActionTypes.LoadRepositories;
}

export class RepositoriesLoaded implements Action {
  readonly type = RepositoryActionTypes.RepositoriesLoaded;

  constructor(public payload: { repositories: Repository[] }) {
  }
}

export class LoadRepository implements Action {
  readonly type = RepositoryActionTypes.LoadRepository;

  constructor(public payload: { id: string }) {
  }
}

export class UpdateRepository implements Action {
  readonly type = RepositoryActionTypes.UpdateRepository;

  constructor(public payload: { update: Update<Repository> }) {
  }
}

export type RepositoryActions =
  LoadRepositories
  | RepositoriesLoaded
  | LoadRepository
  | UpdateRepository;
