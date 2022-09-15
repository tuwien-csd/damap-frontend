import {Component, OnDestroy} from '@angular/core';
import {REPO_FILTERS} from '../repo-filters';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/states/app.state';
import {loadAllRepositories, setRepositoryFilter} from '../../../../store/actions/repository.actions';

@Component({
  selector: 'app-repo-filter',
  templateUrl: './repo-filter.component.html',
  styleUrls: ['./repo-filter.component.css']
})
export class RepoFilterComponent implements OnDestroy {

  filters = REPO_FILTERS;

  show = false;

  constructor(private store: Store<AppState>) {
  }

  ngOnDestroy(): void {
    this.store.dispatch(loadAllRepositories());
  }

  onFilterChange(filterName: string, event: string[]) {
    this.store.dispatch(setRepositoryFilter({filter: {name: filterName, value: event}}));
  }

}
