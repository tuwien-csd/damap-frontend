import {createAction, props} from '@ngrx/store';
import {InternalStorage} from '../../domain/internal-storage';

export const loadInternalStorages = createAction('[Internal Storages] Load');

export const internalStoragesLoaded = createAction('[Internal Storages] Loaded', props<{ internalStorages: InternalStorage[] }>());

export const failedToLoadInternalStorages = createAction('[Internal Storages] Failed to load');
