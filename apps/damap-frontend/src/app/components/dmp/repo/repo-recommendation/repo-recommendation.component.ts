import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RepositoryDetails} from '../../../../domain/repository-details';
import {LoadingState} from '../../../../domain/enum/loading-state.enum';
import {Repository} from '../../../../domain/repository';

@Component({
  selector: 'app-repo-recommendation',
  templateUrl: './repo-recommendation.component.html',
  styleUrls: ['./repo-recommendation.component.css']
})
export class RepoRecommendationComponent {

  @Input() recommended: RepositoryDetails[];
  @Input() loaded: LoadingState;
  @Input() selectedRepos: Repository[];

  readonly LoadingState = LoadingState;

  @Output() repositoryToAdd = new EventEmitter<any>();

  constructor() {
  }

  addRepository(repo: RepositoryDetails) {
    this.repositoryToAdd.emit(repo);
  }

}
