import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BackendService} from '../../services/backend.service';
import * as InternalStorageAction from '../actions/internal-storage.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class InternalStorageEffects {

  loadInternalStorages$ = createEffect(() => this.actions$.pipe(
    ofType(InternalStorageAction.loadInternalStorages),
    switchMap(_ => this.backendService.getInternalStorages().pipe(
      map(internalStorages => InternalStorageAction.internalStoragesLoaded({internalStorages})),
      catchError(() => of(InternalStorageAction.failedToLoadInternalStorages()))
    ))
  ));

  constructor(
    private actions$: Actions,
    private backendService: BackendService
  ) {
  }
}
