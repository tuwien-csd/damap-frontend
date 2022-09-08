import {provideMockActions} from '@ngrx/effects/testing';
import {TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';
import {mockProject} from '../../mocks/project-mocks';
import {FailedToLoadProjects, ProjectActionTypes, ProjectsLoaded} from '../actions/project.actions';
import {ProjectEffects} from './project.effects';
import {BackendService} from '../../services/backend.service';
import {HttpErrorResponse} from '@angular/common/http';

describe('ProjectEffects', () => {
  let actions$;
  let effects;
  let backendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectEffects,
        provideMockActions(() => actions$),
        [{provide: BackendService, useValue: jasmine.createSpyObj('BackendService', ['getSuggestedProjects'])}]]
    });
    effects = TestBed.inject<ProjectEffects>(ProjectEffects);
    backendService = TestBed.inject<BackendService>(BackendService);
  });

  it('should load and return projects', () => {
    actions$ = of({type: ProjectActionTypes.LoadProjects});
    backendService.getSuggestedProjects.and.returnValue(of([mockProject]));

    effects.loadProjects$.subscribe(action => {
      expect(backendService.getSuggestedProjects).toHaveBeenCalledWith();
      expect(action).toEqual(new ProjectsLoaded({projects: [mockProject]}));
    });
  });

  it('should load projects and fail', () => {
    actions$ = of({type: ProjectActionTypes.LoadProjects});
    backendService.getSuggestedProjects.and.returnValue(throwError(() => new HttpErrorResponse({})));

    effects.loadProjects$.subscribe(action => {
      expect(backendService.getSuggestedProjects).toHaveBeenCalledWith();
      expect(action).toEqual(new FailedToLoadProjects());
    });
  });

});
