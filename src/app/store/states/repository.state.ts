import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Repository} from '../../domain/repository';

export interface RepositoryState extends EntityState<Repository>{
  loaded: boolean;
}

export const adapter: EntityAdapter<Repository> = createEntityAdapter<Repository>();

export const initialRepositoryState: RepositoryState = adapter.getInitialState({
  loaded: false
})
