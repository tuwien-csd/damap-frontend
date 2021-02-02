import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../domain/project';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() projects: Project[];
  @Input() loaded: boolean;
  @Input() projectStep: FormControl;

  @Output() project = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  changeProject(project: Project): void {
    this.project.emit(project);
  }
}
