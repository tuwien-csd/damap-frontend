import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import {BackendService} from '../../services/backend.service';
import * as RepositoryAction from '../actions/repository.actions';
import {asyncScheduler, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../states/app.state';
import {selectFilters} from '../selectors/repository.selectors';

@Injectable()
export class RepositoryEffects {

  loadRecommendedRepositories$ = createEffect(() => this.actions$.pipe(
    ofType(RepositoryAction.loadRecommendedRepositories),
    switchMap(_ => this.backendService.getRecommendedRepositories().pipe(
      map(repositories => RepositoryAction.recommendedRepositoriesLoaded({repositories})),
      catchError(() => of(RepositoryAction.failedToLoadRecommendedRepositories()))
    ))
  ));

  loadRepositories$ = createEffect(() => this.actions$.pipe(
    ofType(RepositoryAction.loadAllRepositories),
    switchMap(_ => this.backendService.getRepositories().pipe(
      map(repositories => RepositoryAction.repositoriesLoaded({repositories})),
      catchError(() => of(RepositoryAction.failedToLoadRepositories())),
      takeUntil(this.actions$.pipe(ofType(RepositoryAction.setRepositoryFilter)))
    )),
  ));

  loadRepository$ = createEffect(() => this.actions$.pipe(
    ofType(RepositoryAction.loadRepository),
    switchMap(action => this.backendService.getRepositoryById(action.id).pipe(
      map(update => RepositoryAction.updateRepository({update}))
    )),
  ));

  searchRepositoriesByQuery$ = createEffect(() =>
    ({ // assign default values so they can be overwritten for tests
       debounce = 1500, scheduler = asyncScheduler
     } = {}) => this.actions$.pipe(
      ofType(RepositoryAction.setRepositoryFilter),
      debounceTime(debounce, scheduler),
      distinctUntilChanged(),
      withLatestFrom(this.store$.select(selectFilters)),
      switchMap(([_, state]) => {
          const filters = Object.keys(state)?.find(item => state[item]?.length);
          if (filters) {
            return this.backendService.searchRepository(state).pipe(
              map(repositories => RepositoryAction.repositoriesLoaded({repositories})),
              catchError(() => of(RepositoryAction.failedToLoadRepositories())),
              takeUntil(this.actions$.pipe(ofType(RepositoryAction.loadAllRepositories))))
          }
          return of(RepositoryAction.loadAllRepositories());
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
