import {TestBed} from '@angular/core/testing';
import {InternalStorageEffects} from './internal-storage.effects';
import {provideMockActions} from '@ngrx/effects/testing';
import {BackendService} from '../../services/backend.service';
import {of, throwError} from 'rxjs';
import * as InternalStorageAction from '../actions/internal-storage.actions';
import {mockInternalStorage} from '../../mocks/storage-mocks';
import {HttpErrorResponse} from '@angular/common/http';

describe('InternalStorageEffects', () => {
  let actions$;
  let effects;
  let backendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InternalStorageEffects,
        provideMockActions(() => actions$),
        [{provide: BackendService, useValue: jasmine.createSpyObj('BackendService', ['getInternalStorages'])}]
      ]
    });
    effects = TestBed.inject<InternalStorageEffects>(InternalStorageEffects);
    backendService = TestBed.inject<BackendService>(BackendService);
  });

  it('should load and return internal storages', () => {
    actions$ = of(InternalStorageAction.loadInternalStorages);
    backendService.getInternalStorages.and.returnValue(of([mockInternalStorage]));

    effects.loadInternalStorages$.subscribe(action => {
      expect(backendService.getInternalStorages).toHaveBeenCalledWith();
      expect(action).toEqual(InternalStorageAction.internalStoragesLoaded({internalStorages: [mockInternalStorage]}));
    });
  });

  it('should load internal storages and fail', () => {
    actions$ = of(InternalStorageAction.loadInternalStorages);
    backendService.getInternalStorages.and.returnValue(throwError(() => new HttpErrorResponse({})));

    effects.loadInternalStorages$.subscribe(action => {
      expect(backendService.getInternalStorages).toHaveBeenCalledWith();
      expect(action).toEqual(InternalStorageAction.failedToLoadInternalStorages());
    });
  });

})
