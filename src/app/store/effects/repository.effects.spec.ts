import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {BackendService} from '../../services/backend.service';
import {RepositoryEffects} from './repository.effects';
import {of, throwError} from 'rxjs';
import * as RepositoryAction from '../actions/repository.actions';
import {mockDetailRepo, mockRepo} from '../../mocks/repository-mocks';
import {provideMockStore} from '@ngrx/store/testing';
import {selectFilters} from '../selectors/repository.selectors';
import {IdentifierType} from '../../domain/enum/identifier-type.enum';
import {TestScheduler} from 'rxjs/testing';
import {HttpErrorResponse} from '@angular/common/http';

describe('RepositoryEffects', () => {
  let actions$;
  let effects;
  let backendService;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RepositoryEffects,
        provideMockActions(() => actions$),
        provideMockStore({
            selectors: [{
              selector: selectFilters,
              value: {identifier: [IdentifierType.ORCID]}
            }]
          }
        ),
        [{
          provide: BackendService,
          useValue: jasmine.createSpyObj('BackendService',
            ['getRepositories', 'getRepositoryById', 'searchRepository'])
        }]],
    });
    effects = TestBed.inject<RepositoryEffects>(RepositoryEffects);
    backendService = TestBed.inject<BackendService>(BackendService);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should load and return repositories', () => {
    actions$ = of(RepositoryAction.loadAllRepositories);
    backendService.getRepositories.and.returnValue(of([mockRepo]));

    effects.loadRepositories$.subscribe(action => {
      expect(backendService.getRepositories).toHaveBeenCalled();
      expect(action).toEqual(RepositoryAction.repositoriesLoaded({repositories: [mockRepo]}));
    });
  });

  it('should load and return repository', () => {
    actions$ = of(RepositoryAction.loadRepository(mockDetailRepo));
    backendService.getRepositoryById.and.returnValue(of({
      id: mockDetailRepo.id,
      changes: mockDetailRepo
    }));

    effects.loadRepository$.subscribe(action => {
      expect(backendService.getRepositoryById).toHaveBeenCalledWith(mockDetailRepo.id);
      expect(action).toEqual(RepositoryAction.updateRepository({update: {id: mockDetailRepo.id, changes: mockDetailRepo}}));
    });
  });

  it('should search repositories by query', () => {
    actions$ = of(RepositoryAction.setRepositoryFilter);
    backendService.searchRepository.and.returnValue(of([mockRepo]));

    effects.searchRepositoriesByQuery$({
      debounce: 10, scheduler: testScheduler,
    }).subscribe(action => {
      expect(backendService.searchRepository).toHaveBeenCalledWith({identifier: [IdentifierType.ORCID]});
      expect(action).toEqual(RepositoryAction.repositoriesLoaded({repositories: [mockRepo]}));
    });
  });

  it('should load repositories and fail', () => {
    actions$ = of(RepositoryAction.loadAllRepositories);
    backendService.getRepositories.and.returnValue(throwError(new HttpErrorResponse({})));

    effects.loadRepositories$.subscribe(action => {
      expect(backendService.getRepositories).toHaveBeenCalled();
      expect(action).toEqual(RepositoryAction.failedToLoadRepositories);
    });
  });
});
