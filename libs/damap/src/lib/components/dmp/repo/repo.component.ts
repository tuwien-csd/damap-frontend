import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormArray, UntypedFormGroup} from '@angular/forms';
import {RepositoryDetails} from '../../../domain/repository-details';
import {LoadingState} from '../../../domain/enum/loading-state.enum';
import {Dataset} from '../../../domain/dataset';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/states/app.state';
import {Observable} from 'rxjs';
import {
  selectRecommendedRepositories,
  selectRecommendedRepositoriesLoaded,
  selectRepositories,
  selectRepositoriesLoaded
} from '../../../store/selectors/repository.selectors';
import {
  loadAllRepositories,
  loadRecommendedRepositories,
  loadRepository
} from '../../../store/actions/repository.actions';
import {DataSource} from '../../../domain/enum/data-source.enum';

@Component({
  selector: 'app-dmp-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css'],
})
export class RepoComponent implements OnInit {

  repositoriesLoaded: LoadingState;
  repositories: RepositoryDetails[]; // Repo list loaded from backend
  recommendedLoaded$: Observable<LoadingState>;
  recommended$: Observable<RepositoryDetails[]>;

  @Input() dmpForm: UntypedFormGroup;
  @Input() repoStep: UntypedFormArray;
  @Input() datasets: UntypedFormArray;

  @Output() repositoryToAdd = new EventEmitter<any>();
  @Output() repositoryToRemove = new EventEmitter<any>();

  LoadingState = LoadingState;
  readonly datasetSource: any = DataSource;

  constructor(public store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(selectRepositoriesLoaded)).subscribe(val => this.repositoriesLoaded = val);
    this.store.pipe(select(selectRepositories)).subscribe(val => this.repositories = val);
    this.recommendedLoaded$ = this.store.pipe(select(selectRecommendedRepositoriesLoaded));
    this.recommended$ = this.store.pipe(select(selectRecommendedRepositories));
    this.getRecommendedRepositories();
    this.getRepositories();
  }

  addRepository(repo: RepositoryDetails) {
    this.repositoryToAdd.emit(repo);
  }

  removeRepository(index: number): void {
    this.repositoryToRemove.emit(index);
  }

  getRepositoryDetails(repo: RepositoryDetails) {
    if (!repo.description) {
      this.store.dispatch(loadRepository({id: repo.id}));
    }
  }

  getDatasetsMarkedForDeletion(index: number): Dataset[] {
    const repo = this.repoStep.at(index);
    return this.datasets.value.filter(item => item.delete && repo.value.datasets.includes(item.referenceHash));
  }

  getDatasetsMarkedForDeletionAsString(index: number): string {
    const datasets: Dataset[] = this.getDatasetsMarkedForDeletion(index);
    let result = '';
    for (const [i, item] of datasets.entries()) {
      result += '\"' + item.title + '\"';
      result += (i < datasets.length - 1) ? ', ' : '';
    }
    return result;
  }

  private getRecommendedRepositories() {
    this.recommendedLoaded$.subscribe(loaded => {
      if (loaded === LoadingState.NOT_LOADED) {
        this.store.dispatch(loadRecommendedRepositories());
      }
    });
  }

  private getRepositories() {
    if (this.repositoriesLoaded === LoadingState.NOT_LOADED) {
      this.store.dispatch(loadAllRepositories());
    }
  }
}
