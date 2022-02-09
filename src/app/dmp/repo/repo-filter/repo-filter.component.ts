import {Component, OnDestroy} from '@angular/core';
import {REPO_FILTERS} from '../repo-filters';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/states/app.state';
import {LoadAllRepositories, SetRepositoryFilter} from '../../../store/actions/repository.actions';
import {selectFilters} from '../../../store/states/repository.state';

@Component({
  selector: 'app-repo-filter',
  templateUrl: './repo-filter.component.html',
  styleUrls: ['./repo-filter.component.css']
})
export class RepoFilterComponent implements OnDestroy {

  filters = REPO_FILTERS;

  constructor(private store: Store<AppState>) {
  }

  ngOnDestroy(): void {
    this.store.pipe(select(selectFilters)).subscribe(filters => {
      if (filters) {
        this.store.dispatch(new LoadAllRepositories());
      }
    })
  }

  onFilterChange(filterName: string, event: string[]) {
    this.store.dispatch(new SetRepositoryFilter({filter: {name: filterName, value: event}}));
  }

}
