import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Project} from '../../domain/project';
import {BackendService} from '../../services/backend.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnChanges {

  @Input() dmpForm: FormGroup;
  @Input() userId;

  projects: Project[];
  projectStep: FormControl;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.projectStep = this.dmpForm.get('project') as FormControl;
    // TODO: Adapt
    /*this.projectStep.valueChanges.subscribe(newVal => {
      if (newVal) {
        const contact = newVal.leader;
        if (contact) {
          this.dmpForm.get('contact').setValue(contact);
        }
      }
    });*/
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userId && this.userId) {
      this.getSuggestedProjects();
    }
  }

  setProject(project: Project): void {
    this.projectStep.setValue(project);
  }

  unsetProject(): void {
    this.projectStep.reset();
  }

  private getSuggestedProjects() {
    this.backendService.getSuggestedProjects(this.userId)
      .subscribe(projects => {
        this.projects = projects;
      });
  }
}
