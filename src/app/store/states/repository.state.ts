import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {RepositoryDetails} from '../../domain/repository-details';
import {LoadingState} from '../../domain/enum/loading-state.enum';

export interface RepositoryState extends EntityState<RepositoryDetails> {
  loaded: LoadingState;
  filters: { [key: string]: string[] }
  recommended: RepositoryDetails[];
  recommendedLoaded: LoadingState;
}

export const adapter: EntityAdapter<RepositoryDetails> = createEntityAdapter<RepositoryDetails>();

export const initialRepositoryState: RepositoryState = adapter.getInitialState({
  loaded: LoadingState.NOT_LOADED,
  filters: {},
  recommended: [],
  recommendedLoaded: LoadingState.NOT_LOADED
})
