import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Project} from '../../../domain/project';
import {UntypedFormControl} from '@angular/forms';
import {LoadingState} from '../../../domain/enum/loading-state.enum';
import {MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {

  @Input() projects: Project[];
  @Input() loaded: LoadingState;
  @Input() projectStep: UntypedFormControl;

  @Output() project = new EventEmitter<any>();

  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  LoadingState = LoadingState;
  selectedIndex = 0;

  changeProject(project: Project): void {
    this.project.emit(project);
  }

  changeTab(index: number): void {
    this.tabGroup.selectedIndex = index;
  }
}
