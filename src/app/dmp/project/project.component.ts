import {Component, Input, OnInit} from '@angular/core';
import { Project} from '../../model/project';

@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() project: Project;

  constructor() { }

  ngOnInit(): void {
  }

}
