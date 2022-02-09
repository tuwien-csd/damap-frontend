import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import {BackendService} from '../../services/backend.service';
import {
  FailedToLoadRepositories,
  LoadAllRepositories,
  LoadRepository,
  RepositoriesLoaded,
  RepositoryActionTypes,
  SetRepositoryFilter,
  UpdateRepository
} from '../actions/repository.actions';
import {asyncScheduler, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../states/app.state';
import {selectFilters} from '../states/repository.state';

@Injectable()
export class RepositoryEffects {

  loadRepositories$ = createEffect(() => this.actions$.pipe(
    ofType<LoadAllRepositories>(RepositoryActionTypes.LoadAllRepositories),
    switchMap(_ => this.backendService.getRepositories().pipe(
      map(repositories => new RepositoriesLoaded({repositories})),
      catchError(() => of(new FailedToLoadRepositories())),
      takeUntil(this.actions$.pipe(ofType(RepositoryActionTypes.SetRepositoryFilter)))
    )),
  ));

  loadRepository$ = createEffect(() => this.actions$.pipe(
    ofType<LoadRepository>(RepositoryActionTypes.LoadRepository),
    switchMap(action => this.backendService.getRepositoryById(action.payload.id).pipe(
      map(update => new UpdateRepository({update}))
    )),
  ));

  searchRepositoriesByQuery$ = createEffect(() =>
    ({ // assign default values so they can be overwritten for tests
       debounce = 1500, scheduler = asyncScheduler
     } = {}) => this.actions$.pipe(
      ofType<SetRepositoryFilter>(RepositoryActionTypes.SetRepositoryFilter),
      debounceTime(debounce, scheduler),
      distinctUntilChanged(),
      withLatestFrom(this.store$.select(selectFilters)),
      switchMap(([_, state]) => {
          const filters = Object.keys(state)?.find(item => state[item]?.length);
          if (filters) {
            return this.backendService.searchRepository(state).pipe(
              map(repositories => new RepositoriesLoaded({repositories})),
              catchError(() => of(new FailedToLoadRepositories())),
              takeUntil(this.actions$.pipe(ofType(RepositoryActionTypes.LoadAllRepositories))))
          }
        return of(new LoadAllRepositories());
        }
      ),
    ));

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private backendService: BackendService
  ) {
  }
}
