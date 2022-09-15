import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Project} from '../../../../domain/project';
import {MatSelectionListChange} from '@angular/material/list';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {

  @Input() selectedProject: Project;
  @Input() projects: Project[];
  @Output() projectToSet = new EventEmitter<Project>();

  changeProject(event: MatSelectionListChange): void {
    this.projectToSet.emit(event.source.selectedOptions.selected[0]?.value);
  }

}
