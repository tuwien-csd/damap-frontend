import {Action} from '@ngrx/store';
import {DmpListItem} from '../../domain/dmp-list-item';

export enum DmpActionTypes {
  LoadDmps = '[Dmps] Load Dmps',
  DmpsLoaded = '[Dmps] Dmps Loaded'
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

export type DmpActions =
  LoadDmps
  | DmpsLoaded;
