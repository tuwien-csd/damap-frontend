import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {DmpActionTypes, FailedToLoadDmps, DmpsLoaded, LoadDmps} from '../actions/dmp.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {BackendService} from '../../services/backend.service';
import {of} from 'rxjs';

@Injectable()
export class DmpEffects {

  loadDmps$ = createEffect(() => this.actions$.pipe(
    ofType<LoadDmps>(DmpActionTypes.LoadDmps),
    switchMap(_ => this.backendService.getDmps()
      .pipe(
        map(dmps => new DmpsLoaded({dmps})),
        catchError(() => of(new FailedToLoadDmps()))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private backendService: BackendService
  ) {
  }
}
