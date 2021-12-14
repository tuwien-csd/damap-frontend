import {provideMockActions} from '@ngrx/effects/testing';
import {TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';
import {BackendService} from '../../services/backend.service';
import {DmpEffects} from './dmp.effects';
import {DmpActionTypes, DmpsLoaded, FailedToLoadDmps} from '../actions/dmp.actions';
import {mockDmpList} from '../../mocks/dmp-list-mocks';

describe('DmpEffects', () => {
  let actions$;
  let effects;
  let backendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DmpEffects,
        provideMockActions(() => actions$),
        [{provide: BackendService, useValue: jasmine.createSpyObj('BackendService', ['getDmps'])}]]
    });
    effects = TestBed.inject<DmpEffects>(DmpEffects);
    backendService = TestBed.inject<BackendService>(BackendService);
  });

  it('should load and return dmps', () => {
    actions$ = of({type: DmpActionTypes.LoadDmps});
    backendService.getDmps.and.returnValue(of(mockDmpList));

    effects.loadDmps$.subscribe(action => {
      expect(backendService.getDmps).toHaveBeenCalledWith();
      expect(action).toEqual(new DmpsLoaded({dmps: mockDmpList}));
    });
  });

  it('should load dmps and fail', () => {
    actions$ = of({type: DmpActionTypes.LoadDmps});
    backendService.getDmps.and.returnValue(throwError(new Error('')));

    effects.loadDmps$.subscribe(action => {
      expect(backendService.getDmps).toHaveBeenCalledWith();
      expect(action).toEqual(new FailedToLoadDmps());
    });
  });

});
