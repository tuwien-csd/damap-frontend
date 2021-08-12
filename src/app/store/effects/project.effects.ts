import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {LoadProjects, ProjectActionTypes, FailedToLoadProjects, ProjectsLoaded} from '../actions/project.actions';
import {BackendService} from '../../services/backend.service';
import {of} from 'rxjs';

@Injectable()
export class ProjectEffects {

  loadProjects$ = createEffect(() => this.actions$.pipe(
    ofType<LoadProjects>(ProjectActionTypes.LoadProjects),
    switchMap(_ => this.backendService.getSuggestedProjects()
      .pipe(
        map(projects => new ProjectsLoaded({projects})),
        catchError(() => of(new FailedToLoadProjects()))
      )
    ),
  ));

  constructor(
    private actions$: Actions,
    private backendService: BackendService
  ) {
  }
}
