import {provideMockActions} from '@ngrx/effects/testing';
import {TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';
import {BackendService} from '../../services/backend.service';
import {DmpEffects} from './dmp.effects';
import {createDmp, dmpsLoaded, exportDmp, failedToLoadDmps, loadDmps} from '../actions/dmp.actions';
import {mockDmpList} from '../../mocks/dmp-list-mocks';
import {provideMockStore} from '@ngrx/store/testing';
import {FormService} from '../../services/form.service';
import {FeedbackService} from '../../services/feedback.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LoadingState} from '../../domain/enum/loading-state.enum';
import {completeDmp} from '../../mocks/dmp-mocks';

describe('DmpEffects', () => {
  let actions$;
  let effects;
  let backendService;
  let formService;
  let initialState = {
    damap: {
      dmps: {dmps: [], loaded: LoadingState.LOADED},
      form: {dmp: undefined, changed: false}
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DmpEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState}),
        {
          provide: BackendService,
          useValue: jasmine.createSpyObj('BackendService',
            ['getDmps', 'createDmp', 'editDmp', 'saveDmpVersion', 'getDmpDocument'])
        },
        {provide: FormService, useValue: jasmine.createSpyObj('FormService', ['mapDmpToForm'])},
        {provide: FeedbackService, useValue: jasmine.createSpyObj('FeedbackService', ['success'])},
      ]
    });
    effects = TestBed.inject<DmpEffects>(DmpEffects);
    backendService = TestBed.inject<BackendService>(BackendService);
    formService = TestBed.inject<FormService>(FormService);
  });

  it('should load and return dmps', () => {
    actions$ = of(loadDmps(false));
    backendService.getDmps.and.returnValue(of(mockDmpList));

    effects.loadDmps$.subscribe(action => {
      expect(backendService.getDmps).toHaveBeenCalledTimes(1);
      expect(action).toEqual(dmpsLoaded({dmps: mockDmpList}));
    });
  });

  it('should not load dmps', () => {
    actions$ = of(loadDmps());

    effects.loadDmps$.subscribe({
      complete: () => expect(backendService.getDmps).toHaveBeenCalledTimes(0)
    });
  });

  it('should load dmps and fail', () => {
    actions$ = of(loadDmps(false));
    backendService.getDmps.and.returnValue(throwError(() => new HttpErrorResponse({})));

    effects.loadDmps$.subscribe(action => {
      expect(backendService.getDmps).toHaveBeenCalledTimes(1);
      expect(action).toEqual(failedToLoadDmps());
    });
  });

  it('should create dmp', () => {
    actions$ = of(createDmp({dmp: completeDmp}));
    backendService.createDmp.and.returnValue(of(completeDmp));
    const storeSpy = spyOn(effects.store$, 'dispatch').and.callThrough();

    effects.createDmp$.subscribe({
        next: action => {
          expect(action).toEqual(loadDmps(false));
        },
        complete: () => {
          expect(backendService.createDmp).toHaveBeenCalledOnceWith(completeDmp);
          expect(formService.mapDmpToForm).toHaveBeenCalledTimes(1);
          expect(storeSpy).toHaveBeenCalledTimes(2);
        }
      }
    );
  });

  it('should save and export dmp', () => {
    actions$ = of(exportDmp({dmp: completeDmp}));
    backendService.editDmp.and.returnValue(of(completeDmp));

    effects.exportDmp$.subscribe({
        complete: () => {
          expect(backendService.editDmp).toHaveBeenCalledTimes(0);
          expect(formService.mapDmpToForm).toHaveBeenCalledTimes(0);
          expect(backendService.getDmpDocument).toHaveBeenCalledOnceWith(completeDmp.id);
        }
      }
    );
  });

  it('should export dmp without saving', () => {
    effects.store$.setState({damap: {dmps: {dmps: [], loaded: LoadingState.LOADED}, form: {changed: true}}});

    actions$ = of(exportDmp({dmp: completeDmp}));
    backendService.editDmp.and.returnValue(of(completeDmp));
    const storeSpy = spyOn(effects.store$, 'dispatch').and.callThrough();

    effects.exportDmp$.subscribe({
        complete: () => {
          expect(backendService.editDmp).toHaveBeenCalledTimes(1);
          expect(formService.mapDmpToForm).toHaveBeenCalledOnceWith(completeDmp);
          expect(backendService.getDmpDocument).toHaveBeenCalledOnceWith(completeDmp.id);
          expect(storeSpy).toHaveBeenCalledTimes(2);
        }
      }
    );
  });

  it('should fail to save and export dmp', () => {
    effects.store$.setState({damap: {dmps: {dmps: [], loaded: LoadingState.LOADED}, form: {changed: true}}});

    actions$ = of(exportDmp({dmp: completeDmp}));
    backendService.editDmp.and.returnValue(throwError(() => new HttpErrorResponse({})));
    const storeSpy = spyOn(effects.store$, 'dispatch').and.callThrough();

    effects.exportDmp$.subscribe({
        complete: () => {
          expect(backendService.editDmp).toHaveBeenCalledTimes(1);
          expect(formService.mapDmpToForm).toHaveBeenCalledTimes(0);
          expect(backendService.getDmpDocument).toHaveBeenCalledTimes(0);
          expect(storeSpy).toHaveBeenCalledTimes(0);
        }
      }
    );
  });

});
