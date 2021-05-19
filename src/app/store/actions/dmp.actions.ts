import {Action} from '@ngrx/store';
import {DmpListItem} from '../../domain/dmp-list-item';

export enum DmpActionTypes {
  LoadDmps = '[Dmps] Load',
  DmpsLoaded = '[Dmps] Loaded',
  DmpsFailedToLoad = '[Dmps] Failed to load'
}

export class LoadDmps implements Action {
  readonly type = DmpActionTypes.LoadDmps;

  constructor(public payload: { userId: string }) {
  }
}

export class DmpsLoaded implements Action {
  readonly type = DmpActionTypes.DmpsLoaded;

  constructor(public payload: { dmps: DmpListItem[] }) {
  }
}

export class DmpsFailedToLoad implements Action {
  readonly type = DmpActionTypes.DmpsFailedToLoad;
}

export type DmpActions =
  LoadDmps
  | DmpsLoaded
  | DmpsFailedToLoad;
