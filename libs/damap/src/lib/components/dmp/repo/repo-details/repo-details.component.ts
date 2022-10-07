import {Component, Input} from '@angular/core';
import {RepositoryDetails} from '../../../../domain/repository-details';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.css']
})
export class RepoDetailsComponent {

  @Input() repo: RepositoryDetails;

  constructor() {
  }

}
