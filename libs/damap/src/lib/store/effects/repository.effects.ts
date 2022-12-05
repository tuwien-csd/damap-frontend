import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, debounceTime, filter, map, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import {BackendService} from '../../services/backend.service';
import * as RepositoryAction from '../actions/repository.actions';
import {asyncScheduler, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../states/app.state';
import {selectRecommendedRepositoriesLoaded, selectRepositoriesLoaded} from "../selectors/repository.selectors";
import {LoadingState} from "../../domain/enum/loading-state.enum";

@Injectable()
export class RepositoryEffects {

  loadRecommendedRepositories$ = createEffect(() => this.actions$.pipe(
    ofType(RepositoryAction.loadRecommendedRepositories),
    withLatestFrom(this.store$.select(selectRecommendedRepositoriesLoaded)),
    filter(([_, loaded]) => (loaded !== LoadingState.LOADED)), // prevent unnecessary reloads
    switchMap(_ => this.backendService.getRecommendedRepositories().pipe(
      map(repositories => RepositoryAction.recommendedRepositoriesLoaded({repositories})),
      catchError(() => of(RepositoryAction.failedToLoadRecommendedRepositories()))
    ))
  ));

  loadRepositories$ = createEffect(() => this.actions$.pipe(
    ofType(RepositoryAction.loadAllRepositories),
    withLatestFrom(this.store$.select(selectRepositoriesLoaded)),
    filter(([action, loaded]) => !(action.skipIfPresent && loaded === LoadingState.LOADED)),
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
       debounce = 150, scheduler = asyncScheduler
     } = {}) => this.actions$.pipe(
      ofType(RepositoryAction.setRepositoryFilter),
      debounceTime(debounce, scheduler),
      switchMap((action) => {
          const filters = Object.keys(action.filter)?.find(item => action.filter[item]?.length);
          if (filters) {
            return this.backendService.searchRepository(action.filter).pipe(
              map(repositories => RepositoryAction.repositoriesLoaded({repositories})),
              catchError(() => of(RepositoryAction.failedToLoadRepositories())),
              takeUntil(this.actions$.pipe(ofType((RepositoryAction.loadAllRepositories || RepositoryAction.setRepositoryFilter)))))
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
