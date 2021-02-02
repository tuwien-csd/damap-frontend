import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {LoadSuggestedProjects, ProjectActionTypes, SuggestedProjectsLoaded} from '../actions/project.actions';
import {BackendService} from '../../services/backend.service';

@Injectable()
export class ProjectEffects {

  @Effect()
  loadProjects$ = this.actions$.pipe(
    ofType<LoadSuggestedProjects>(ProjectActionTypes.LoadSuggestedProjects),
    mergeMap(action => this.backendService.getSuggestedProjects(action.payload.userId)),
    map(projects => new SuggestedProjectsLoaded({projects}))
  );

  constructor(
    private actions$: Actions,
    private backendService: BackendService
  ) {
  }
}
