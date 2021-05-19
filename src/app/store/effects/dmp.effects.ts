import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {DmpActionTypes, DmpsFailedToLoad, DmpsLoaded, LoadDmps} from '../actions/dmp.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {BackendService} from '../../services/backend.service';
import {of} from 'rxjs';

@Injectable()
export class DmpEffects {

  @Effect()
  loadDmps$ = this.actions$.pipe(
    ofType<LoadDmps>(DmpActionTypes.LoadDmps),
    mergeMap(action => this.backendService.getDmps(action.payload.userId)
      .pipe(
        map(dmps => new DmpsLoaded({dmps})),
        catchError(() => of(new DmpsFailedToLoad()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private backendService: BackendService
  ) {
  }
}
