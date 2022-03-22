import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as DmpAction from '../actions/dmp.actions';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {BackendService} from '../../services/backend.service';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../states/app.state';

@Injectable()
export class DmpEffects {

  loadDmps$ = createEffect(() => this.actions$.pipe(
    ofType(DmpAction.loadDmps),
    filter(action => !action.skipIfPresent),
    switchMap(_ => this.backendService.getDmps()
      .pipe(
        map(dmps => DmpAction.dmpsLoaded({dmps})),
        catchError(() => of(DmpAction.failedToLoadDmps))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private backendService: BackendService
  ) {
  }
}
