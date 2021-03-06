import {createAction, props} from '@ngrx/store';
import {DmpListItem} from '../../domain/dmp-list-item';
import {Dmp} from '../../domain/dmp';

export const loadDmps = createAction('[Dmps] Load all', (skipIfPresent: boolean = true) => ({skipIfPresent}));

export const dmpsLoaded = createAction('[Dmps] All loaded', props<{ dmps: DmpListItem[] }>());

export const failedToLoadDmps = createAction('[Dmps] Failed to load all');

export const createDmp = createAction('[Dmps] Create new dmp', props<{ dmp: Dmp }>());

export const updateDmp = createAction('[Dmps] Update dmp', props<{ dmp: Dmp }>());

export const saveDmpVersion = createAction('[Dmps] Save new version', props<{ dmp: Dmp, versionName: string }>());
