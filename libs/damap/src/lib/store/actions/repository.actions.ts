import {createAction, props} from '@ngrx/store';
import {RepositoryDetails} from '../../domain/repository-details';
import {Update} from '@ngrx/entity';

export const loadRecommendedRepositories = createAction('[Repositories] Load recommended');

export const recommendedRepositoriesLoaded = createAction('[Repositories] Recommended loaded', props<{ repositories: RepositoryDetails[] }>());

export const failedToLoadRecommendedRepositories = createAction('[Repositories] Failed to load recommended');

export const loadAllRepositories = createAction('[Repositories] Load all', (skipIfPresent: boolean = false) => ({skipIfPresent}));

export const repositoriesLoaded = createAction('[Repositories] All loaded', props<{ repositories: RepositoryDetails[] }>());

export const loadRepository = createAction('[Repositories] Load one', props<{ id: string }>());

export const updateRepository = createAction('[Repositories] Update one', props<{ update: Update<RepositoryDetails> }>());

export const failedToLoadRepositories = createAction('[Repositories] Failed to load all');

export const setRepositoryFilter = createAction('[Repositories] Set filter', props<{ filter: { [key: string]: { id: string, label: string }[] } }>());
