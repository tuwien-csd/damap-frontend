import {Action} from '@ngrx/store';
import {DmpListItem} from '../../domain/dmp-list-item';

export enum DmpActionTypes {
  LoadDmps = '[Dmps] Load all',
  DmpsLoaded = '[Dmps] All loaded',
  FailedToLoadDmps = '[Dmps] Failed to load all'
}

export class LoadDmps implements Action {
  readonly type = DmpActionTypes.LoadDmps;
}

export class DmpsLoaded implements Action {
  readonly type = DmpActionTypes.DmpsLoaded;

  constructor(public payload: { dmps: DmpListItem[] }) {
  }
}

export class FailedToLoadDmps implements Action {
  readonly type = DmpActionTypes.FailedToLoadDmps;
}

export type DmpActions =
  LoadDmps
  | DmpsLoaded
  | FailedToLoadDmps;
