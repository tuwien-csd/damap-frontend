import * as DmpAction from '../actions/dmp.actions';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {AppState} from '../states/app.state';
import {BackendService} from '../../services/backend.service';
import {FeedbackService} from '../../services/feedback.service';
import {FormService} from '../../services/form.service';
import {Injectable} from '@angular/core';
import {LoadingState} from '../../domain/enum/loading-state.enum';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {selectDmpsLoaded} from '../selectors/dmp.selectors';
import {selectFormChanged} from '../selectors/form.selectors';
import {setFormValue} from '../actions/form.actions';

@Injectable()
export class DmpEffects {

  loadDmps$ = createEffect(() => this.actions$.pipe(
    ofType(DmpAction.loadDmps),
    withLatestFrom(this.store$.select(selectDmpsLoaded)),
    filter(([action, loaded]) => !(action.skipIfPresent && loaded === LoadingState.LOADED)),
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
        this.store$.dispatch(DmpAction.dmpSaved());
        this.store$.dispatch(setFormValue({dmp}));
        return DmpAction.loadDmps(false);
      }),
      catchError(() => of(DmpAction.failedToSaveDmp()))
    ))
  ));

  updateDmp$ = createEffect(() => this.actions$.pipe(
    ofType(DmpAction.updateDmp),
    switchMap(action =>
      this.backendService.editDmp(action.dmp).pipe(
        map(dmp => {
          this.formService.mapDmpToForm(dmp);
          this.feedbackService.success('dmp.success.update');
          this.store$.dispatch(DmpAction.dmpSaved());
          return setFormValue({dmp});
        }),
        catchError(() => of(DmpAction.failedToSaveDmp()))
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
        catchError((error) => {
          this.store$.dispatch(DmpAction.failedToSaveDmp());
          return error;
        }))
    }),
    switchMap(({version, dmp}) =>
      this.backendService.saveDmpVersion(version).pipe(
        map(() => {
          this.formService.mapDmpToForm(dmp);
          this.feedbackService.success('dmp.success.version.save');
          this.store$.dispatch(DmpAction.dmpSaved());
          this.store$.dispatch(setFormValue({dmp}));
          return DmpAction.loadDmps(true)
        }),
      ))
  ));

  exportDmpTemplate$ = createEffect(() => this.actions$.pipe(
    ofType(DmpAction.exportDmpTemplate),
    withLatestFrom(this.store$.select(selectFormChanged)),
    switchMap(([action, changed]) => {
      if (changed !== false) { 
        let http$ = action.dmp.id ? this.backendService.editDmp(action.dmp) : this.backendService.createDmp(action.dmp);
        return http$.pipe(
          tap(dmp => {
            this.formService.mapDmpToForm(dmp);
            this.store$.dispatch(setFormValue({dmp}));
            this.backendService.exportDmpTemplate(dmp.id, action.dmpTemplateType);
            this.store$.dispatch(DmpAction.dmpExported());
          }),
          catchError(() => of(DmpAction.failedToSaveDmp()))
        );
      }
      this.backendService.exportDmpTemplate(action.dmp.id, action.dmpTemplateType);
      this.store$.dispatch(DmpAction.dmpExported());
      return of(action);
    })), {dispatch: false});

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private backendService: BackendService,
    private formService: FormService,
    private feedbackService: FeedbackService
  ) {
  }
  
}
