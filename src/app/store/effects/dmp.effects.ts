import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as DmpAction from '../actions/dmp.actions';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {BackendService} from '../../services/backend.service';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../states/app.state';
import {FormService} from '../../services/form.service';
import {FeedbackService} from '../../services/feedback.service';
import {setFormValue} from '../actions/form.actions';

@Injectable()
export class DmpEffects {

  loadDmps$ = createEffect(() => this.actions$.pipe(
    ofType(DmpAction.loadDmps),
    filter(action => !action.skipIfPresent),
    switchMap(_ => this.backendService.getDmps()
      .pipe(
        map(dmps => DmpAction.dmpsLoaded({dmps})),
        catchError(() => of(DmpAction.failedToLoadDmps()))
      )
    )
  ));

  createDmp$ = createEffect(() => this.actions$.pipe(
    ofType(DmpAction.createDmp),
    switchMap(action => this.backendService.createDmp(action.dmp).pipe(
      map(dmp => {
        this.formService.mapDmpToForm(dmp);
        this.feedbackService.success('dmp.success.save');
        this.store$.dispatch(setFormValue({dmp}));
        return DmpAction.loadDmps(true);
      })
    ))
  ));

  updateDmp$ = createEffect(() => this.actions$.pipe(
    ofType(DmpAction.updateDmp),
    switchMap(action =>
      this.backendService.editDmp(action.dmp).pipe(
        map(dmp => {
          this.formService.mapDmpToForm(dmp);
          this.feedbackService.success('dmp.success.update');
          return setFormValue({dmp});
        })
      ))
  ));

  saveDmpVersion$ = createEffect(() => this.actions$.pipe(
    ofType(DmpAction.saveDmpVersion),
    switchMap(action => {
      let http$ = action.dmp.id ? this.backendService.editDmp(action.dmp) : this.backendService.createDmp(action.dmp);
      return http$.pipe(
        map(dmp => {
          return {
            version: {
              id: undefined,
              revisionNumber: undefined,
              versionDate: undefined,
              versionName: action.versionName,
              dmpId: dmp.id
            }, dmp: dmp
          };
        }),
      );
    }),
    switchMap(({version, dmp}) =>
      this.backendService.saveDmpVersion(version).pipe(
        map(() => {
          this.formService.mapDmpToForm(dmp);
          this.feedbackService.success('dmp.success.version.save');
          this.store$.dispatch(setFormValue({dmp}));
          return DmpAction.loadDmps(true)
        }),
      ))
  ));

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private backendService: BackendService,
    private formService: FormService,
    private feedbackService: FeedbackService
  ) {
  }
}
