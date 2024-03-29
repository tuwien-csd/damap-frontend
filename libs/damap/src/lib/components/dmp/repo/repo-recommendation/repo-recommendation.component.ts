import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RepositoryDetails } from '../../../../domain/repository-details';
import { LoadingState } from '../../../../domain/enum/loading-state.enum';

@Component({
  selector: 'app-repo-recommendation',
  templateUrl: './repo-recommendation.component.html',
  styleUrls: [],
})
export class RepoRecommendationComponent {
  @Input() recommended: RepositoryDetails[];
  @Input() loaded: LoadingState;

  readonly LoadingState = LoadingState;

  @Output() repositoryToAdd = new EventEmitter<any>();

  addRepository(repo: RepositoryDetails) {
    this.repositoryToAdd.emit(repo);
  }
}
