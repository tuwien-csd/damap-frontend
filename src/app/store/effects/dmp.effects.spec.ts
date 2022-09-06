import {provideMockActions} from '@ngrx/effects/testing';
import {TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';
import {BackendService} from '../../services/backend.service';
import {DmpEffects} from './dmp.effects';
import {dmpsLoaded, failedToLoadDmps, loadDmps} from '../actions/dmp.actions';
import {mockDmpList} from '../../mocks/dmp-list-mocks';
import {provideMockStore} from '@ngrx/store/testing';
import {FormService} from '../../services/form.service';
import {FeedbackService} from '../../services/feedback.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LoadingState} from '../../domain/enum/loading-state.enum';

describe('DmpEffects', () => {
  let actions$;
  let effects;
  let backendService;
  let formService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DmpEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState: {dmps: {dmps: [], loaded: LoadingState.LOADED}}}),
        {
          provide: BackendService,
          useValue: jasmine.createSpyObj('BackendService', ['getDmps', 'createDmp', 'editDmp', 'saveDmpVersion'])
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

});
