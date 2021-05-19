import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {LoadProjects, ProjectActionTypes, ProjectsFailedToLoad, ProjectsLoaded} from '../actions/project.actions';
import {BackendService} from '../../services/backend.service';
import {of} from 'rxjs';

@Injectable()
export class ProjectEffects {

  @Effect()
  loadProjects$ = this.actions$.pipe(
    ofType<LoadProjects>(ProjectActionTypes.LoadProjects),
    mergeMap(action => this.backendService.getSuggestedProjects(action.payload.userId)
      .pipe(
        map(projects => new ProjectsLoaded({projects})),
        catchError(() => of(new ProjectsFailedToLoad()))
      )
    ),
  );

  constructor(
    private actions$: Actions,
    private backendService: BackendService
  ) {
  }
}
