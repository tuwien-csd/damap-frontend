import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {DmpListItem} from '../../domain/dmp-list-item';
import {LoadingState} from '../../domain/enum/loading-state.enum';

export interface DmpState extends EntityState<DmpListItem>{
  loaded: LoadingState;
}

export const adapter: EntityAdapter<DmpListItem> = createEntityAdapter<DmpListItem>();

export const initialDmpState: DmpState = adapter.getInitialState({
  loaded: LoadingState.NOT_LOADED
})
