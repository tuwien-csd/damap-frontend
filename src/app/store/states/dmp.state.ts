import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {DmpListItem} from '../../domain/dmp-list-item';

export interface DmpState extends EntityState<DmpListItem>{
  loaded: boolean;
}

export const adapter: EntityAdapter<DmpListItem> = createEntityAdapter<DmpListItem>();

export const initialDmpState: DmpState = adapter.getInitialState({
  loaded: false
})
