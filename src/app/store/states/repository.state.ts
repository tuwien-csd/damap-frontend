import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Repository} from '../../domain/repository';
import {LoadingState} from '../../domain/enum/loading-state.enum';

export interface RepositoryState extends EntityState<Repository> {
  loaded: LoadingState;
  filters: { [key: string]: string[] }
  recommended: Repository[];
  recommendedLoaded: LoadingState;
}

export const adapter: EntityAdapter<Repository> = createEntityAdapter<Repository>();

export const initialRepositoryState: RepositoryState = adapter.getInitialState({
  loaded: LoadingState.NOT_LOADED,
  filters: null,
  recommended: [],
  recommendedLoaded: LoadingState.NOT_LOADED
})
