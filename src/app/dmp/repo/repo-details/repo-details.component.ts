import {Component, Input} from '@angular/core';
import {Repository} from '../../../domain/repository';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.css']
})
export class RepoDetailsComponent {

  @Input() repo: Repository;

  constructor() { }

}
