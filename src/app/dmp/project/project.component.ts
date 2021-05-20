import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../domain/project';
import {FormControl} from '@angular/forms';
import {LoadingState} from '../../domain/enum/loading-state.enum';

@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() projects: Project[];
  @Input() loaded: LoadingState;
  @Input() projectStep: FormControl;

  @Output() project = new EventEmitter<any>();

  LoadingState = LoadingState;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeProject(project: Project): void {
    this.project.emit(project);
  }
}
