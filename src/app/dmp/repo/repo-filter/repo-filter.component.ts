import {Component, OnDestroy, OnInit} from '@angular/core';
import {REPO_FILTERS} from '../repo-filters';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/states/app.state';
import {ResetRepositoryFilter, SetRepositoryFilter} from '../../../store/actions/repository.actions';

@Component({
  selector: 'app-repo-filter',
  templateUrl: './repo-filter.component.html',
  styleUrls: ['./repo-filter.component.css']
})
export class RepoFilterComponent implements OnInit, OnDestroy {

  filters = REPO_FILTERS;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetRepositoryFilter());
  }

  onFilterChange(filterName: string, event: string[]) {
    this.store.dispatch(new SetRepositoryFilter({filter: {name: filterName, value: event}}));
  }

}
