import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import {BackendService} from '../../services/backend.service';
import {
  FailedToLoadRepositories,
  LoadRepositories,
  LoadRepository,
  RepositoriesLoaded,
  RepositoryActionTypes, ResetRepositoryFilter, SetRepositoryFilter,
  UpdateRepository
} from '../actions/repository.actions';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../states/app.state';
import {selectFilters} from '../states/repository.state';

@Injectable()
export class RepositoryEffects {

  @Effect()
  loadRepositories = this.actions$.pipe(
    ofType<LoadRepositories>(RepositoryActionTypes.LoadRepositories),
    switchMap(_ => this.backendService.getRepositories().pipe(
      map(repositories => new RepositoriesLoaded({repositories})),
      catchError(() => of(new FailedToLoadRepositories())),
      takeUntil(this.actions$.pipe(ofType(RepositoryActionTypes.SetRepositoryFilter)))
    )),
  );

  @Effect()
  loadRepository = this.actions$.pipe(
    ofType<LoadRepository>(RepositoryActionTypes.LoadRepository),
    switchMap(action => this.backendService.getRepositoryById(action.payload.id).pipe(
      map(update => new UpdateRepository({update}))
    )),
  );

  @Effect()
  searchRepositoriesByQuery = this.actions$.pipe(
    ofType<SetRepositoryFilter>(RepositoryActionTypes.SetRepositoryFilter),
    debounceTime(1500),
    distinctUntilChanged(),
    withLatestFrom(this.store$.select(selectFilters)),
    switchMap(([_, state]) => {
        const filters = Object.keys(state)?.find(item => state[item]?.length);
        if (filters) {
          return this.backendService.searchRepository(state).pipe(
            map(repositories => new RepositoriesLoaded({repositories})),
            catchError(() => of(new FailedToLoadRepositories())),
            takeUntil(this.actions$.pipe(ofType(RepositoryActionTypes.ResetRepositoryFilter))))
        }
        return of(new LoadRepositories())
      }
    ),
  );

  @Effect()
  resetRepositoryFilter = this.actions$.pipe(
    ofType<ResetRepositoryFilter>(RepositoryActionTypes.ResetRepositoryFilter),
    map(_ => new LoadRepositories()),
    takeUntil(this.actions$.pipe(ofType(RepositoryActionTypes.SetRepositoryFilter)))
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private backendService: BackendService
  ) {
  }
}
