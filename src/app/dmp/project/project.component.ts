import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../model/project';
import {BackendService} from "../../services/backend.service";
import {MatTableDataSource} from "@angular/material/table";
import {Dmp} from "../../model/dmp";
import {Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  completionLevel: number; // fixme

  @Input() dmp: Dmp;
  @Input() projects: Project[];
  projectList: Project[] = [];

  @Output() projectToAdd = new EventEmitter<Project>();
  @Output() projectToRemove = new EventEmitter<Project>();

  projects$: Observable<Project[]>;
  private searchTerms = new Subject<string>();

  readonly projectTableHeaders: string[] = ['title', 'description', 'startDate', 'endDate', 'remove'];

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
  }

  addProject(project: Project) {
    this.projectToAdd.emit(project);
    this.filterProjects();
  }

  removeProject(project: Project): void {
    this.projectToRemove.emit(project);
    this.filterProjects();
  }

  searchProjects(term: string): void {
    this.searchTerms.next(term);
  }

  private getProjects(): void {
    this.backendService.getProjects()
      .subscribe(projects => {
        this.projects = projects;
      });
    this.filterProjects();
  }

  private filterProjects(): void {
    this.projectList = Object.assign([], this.projects);
    if (this.dmp.projects) {
      for (let entry of this.dmp.projects) {
        this.projectList = this.projectList.filter(e => e !== entry);
      }
    }
  }
}
