import {createAction, props} from '@ngrx/store';
import {DmpListItem} from '../../domain/dmp-list-item';

export const loadDmps = createAction('[Dmps] Load all', (skipIfPresent: boolean = true) => ({skipIfPresent}));

export const dmpsLoaded = createAction('[Dmps] All loaded', props<{ dmps: DmpListItem[] }>());

export const failedToLoadDmps = createAction('[Dmps] Failed to load all');
