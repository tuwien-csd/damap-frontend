import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../model/project';
import {BackendService} from "../../services/backend.service";
import {Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() dmpForm: FormGroup;
  @Input() projects: Project[];

  projects$: Observable<Project[]>;
  private searchTerms = new Subject<string>();

  projectStep: FormControl;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.getProjects();
    this.projects$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.backendService.searchProjects(term)),
    );
    this.projectStep = this.dmpForm.get('project') as FormControl;
    this.projectStep.valueChanges.subscribe(newVal => {
      const contact = newVal[0].leader;
      if(contact) {
        this.dmpForm.get('contact').setValue(contact);
      }
    });
  }

  unsetProject(): void {
    this.projectStep.reset();
  }

  searchProjects(term: string): void {
    this.searchTerms.next(term);
  }

  private getProjects(): void {
    this.backendService.getProjects()
      .subscribe(projects => {
        this.projects = projects;
      });
  }
}
