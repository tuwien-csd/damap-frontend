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
    this.project.emit(project);
    if (project === null) {
      if (this.projectList) {
        this.projectList.fetchRecommendedProjects();
      }
    }
  }

  changeTab(index: number): void {
    this.tabGroup.selectedIndex = index;
  }
}
