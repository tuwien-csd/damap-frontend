import {Project} from '../../domain/project';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface ProjectState extends EntityState<Project>{
  loaded: boolean;
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

export const initialProjectsState: ProjectState = adapter.getInitialState({
  loaded: false
});

