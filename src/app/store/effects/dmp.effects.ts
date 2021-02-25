import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {DmpActionTypes, DmpsLoaded, LoadDmps} from '../actions/dmp.actions';
import {map, mergeMap} from 'rxjs/operators';
import {BackendService} from '../../services/backend.service';

@Injectable()
export class DmpEffects {

  @Effect()
  loadDmps$ = this.actions$.pipe(
    ofType<LoadDmps>(DmpActionTypes.LoadDmps),
    mergeMap(action => this.backendService.getDmps(action.payload.userId)),
    map(dmps => new DmpsLoaded({dmps}))
  );

  constructor(
    private actions$: Actions,
    private backendService: BackendService
  ) {
  }
}
