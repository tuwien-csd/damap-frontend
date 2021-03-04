import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {BackendService} from '../../services/backend.service';
import {LoadRepositories, LoadRepository, RepositoriesLoaded, RepositoryActionTypes, UpdateRepository} from '../actions/repository.actions';

@Injectable()
export class RepositoryEffects {

  @Effect()
  loadRepositories = this.actions$.pipe(
    ofType<LoadRepositories>(RepositoryActionTypes.LoadRepositories),
    mergeMap(_ => this.backendService.getRepositories()),
    map(repositories => new RepositoriesLoaded({repositories}))
  );

  @Effect()
  loadRepository = this.actions$.pipe(
    ofType<LoadRepository>(RepositoryActionTypes.LoadRepository),
    mergeMap(action => this.backendService.getRepositoryById(action.payload.id)),
    map(update => new UpdateRepository({ update }))
  )

  constructor(
    private actions$: Actions,
    private backendService: BackendService
  ) {
  }
}
