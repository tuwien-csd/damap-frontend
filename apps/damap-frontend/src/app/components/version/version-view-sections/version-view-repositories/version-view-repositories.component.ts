import {Component, Input} from '@angular/core';
import {Repository} from '../../../../domain/repository';
import {Dataset} from '../../../../domain/dataset';

@Component({
  selector: 'app-version-view-repositories',
  templateUrl: './version-view-repositories.component.html',
  styleUrls: ['./version-view-repositories.component.css']
})
export class VersionViewRepositoriesComponent {

  @Input() repositories: Repository[];
  @Input() datasets: Dataset[];

  constructor() {
  }

  getDatasetsForRepository(repo: Repository): Dataset[] {
    return this.datasets?.filter(item => repo.datasets.includes(item.referenceHash));

  }
}
