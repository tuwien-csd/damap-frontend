import {Action} from '@ngrx/store';
import {Repository} from '../../domain/repository';
import {Update} from '@ngrx/entity';

export enum RepositoryActionTypes {
  LoadRepositories = '[Repositories] Load all',
  RepositoriesLoaded = '[Repositories] All loaded',
  LoadRepository = '[Repositories] Load one',
  UpdateRepository = '[Repositories] Update one',
  FailedToLoadRepositories = '[Repositories] Failed to load all',
  SetRepositoryFilter = '[Repositories] Set filter',
  ResetRepositoryFilter = '[Repositories] Reset filter'
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

export class FailedToLoadRepositories implements Action {
  readonly type = RepositoryActionTypes.FailedToLoadRepositories;
}

export class SetRepositoryFilter implements Action {
  readonly type = RepositoryActionTypes.SetRepositoryFilter;

  constructor(public payload: { filter: { name: string, value: string [] } }) {
  }
}

export class ResetRepositoryFilter implements Action {
  readonly type = RepositoryActionTypes.ResetRepositoryFilter;
}

export type RepositoryActions =
  LoadRepositories
  | RepositoriesLoaded
  | LoadRepository
  | UpdateRepository
  | FailedToLoadRepositories
  | SetRepositoryFilter
  | ResetRepositoryFilter;
