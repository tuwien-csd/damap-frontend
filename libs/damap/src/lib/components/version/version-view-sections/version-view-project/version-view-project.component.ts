import {Component, Input} from '@angular/core';
import {Project} from '../../../../domain/project';

@Component({
  selector: 'app-version-view-project',
  templateUrl: './version-view-project.component.html',
  styleUrls: ['./version-view-project.component.css']
})
export class VersionViewProjectComponent {

  @Input() project: Project;

  constructor() {
  }

}
