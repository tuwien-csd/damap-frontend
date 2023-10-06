import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Project } from '../../../domain/project';

@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: [],
})
export class ProjectComponent {
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
