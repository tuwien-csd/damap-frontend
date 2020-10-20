import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../model/project';
import {BackendService} from "../../services/backend.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() dmpForm: FormGroup;
  @Input() projects: Project[];

  projectStep: FormControl;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.getProjects();
    this.projectStep = this.dmpForm.get('project') as FormControl;
    this.projectStep.valueChanges.subscribe(newVal => {
      if(newVal){
        const contact = newVal.leader;
        if(contact) {
          this.dmpForm.get('contact').setValue(contact);
        }
      }
    });
  }

  setProject(project: Project): void {
    this.projectStep.setValue(project);
  }

  unsetProject(): void {
    this.projectStep.reset();
  }

  private getProjects(): void {
    this.backendService.getProjects()
      .subscribe(projects => {
        this.projects = projects;
      });
  }
}
