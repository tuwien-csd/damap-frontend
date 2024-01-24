import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { MatTabGroup } from '@angular/material/tabs';
import { Project } from '../../../domain/project';
import { ProjectListComponent } from './project-list/project-list.component';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: [],
})
export class ProjectComponent {
  @Input() projectStep: UntypedFormControl;
  @ViewChild(ProjectListComponent) projectList: ProjectListComponent;
  @Output() project = new EventEmitter<any>();

  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  changeProject(project: Project): void {
    console.log(this.projectList);
    this.project.emit(project);
    if (project === null) {
      // Check if projectList reference is available
      if (this.projectList) {
        this.projectList.fetchRecommendedProjects();
      } else {
        console.error('projectList is not available');
      }
    }
  }

  changeTab(index: number): void {
    this.tabGroup.selectedIndex = index;
  }
}
