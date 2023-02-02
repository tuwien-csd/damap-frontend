import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { LoadingState } from '../../../domain/enum/loading-state.enum';
import { Project } from '../../../domain/project';

@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {

  @Input() loaded: LoadingState;
  @Input() projectStep: UntypedFormControl;

  @Output() project = new EventEmitter<any>();

  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  changeProject(project: Project): void {
    this.project.emit(project);
  }

  changeTab(index: number): void {
    this.tabGroup.selectedIndex = index;
  }
}
