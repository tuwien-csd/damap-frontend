import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Repository} from '../../../domain/repository';
import {Host} from '../../../domain/host';
import {LoadingState} from '../../../domain/enum/loading-state.enum';

@Component({
  selector: 'app-repo-recommendation',
  templateUrl: './repo-recommendation.component.html',
  styleUrls: ['./repo-recommendation.component.css']
})
export class RepoRecommendationComponent {

  @Input() recommended: Repository[];
  @Input() loaded: LoadingState;
  @Input() selectedRepos: Host[];

  readonly LoadingState = LoadingState;

  @Output() repositoryToAdd = new EventEmitter<any>();

  constructor() {
  }

  addRepository(repo: Repository) {
    this.repositoryToAdd.emit(repo);
  }

}
