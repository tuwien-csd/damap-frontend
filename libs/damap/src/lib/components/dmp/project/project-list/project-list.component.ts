import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  merge,
  of,
  switchMap,
} from 'rxjs';

import { BackendService } from '../../../../services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { Project } from '../../../../domain/project';
import { SearchResult } from '../../../../domain/search/search-result';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit, AfterViewInit {
  @Output() projectToSet = new EventEmitter<Project>();
  private _selectedProject: Project;

  @Input()
  get selectedProject(): Project {
    return this._selectedProject;
  }

  set selectedProject(project: Project) {
    this._selectedProject = project;
    if (project === null) {
      this.fetchRecommendedProjects();
    }
  }

  private searchTerms = new Subject<string>();
  searchResult$: Observable<SearchResult<Project>>;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchDefaultRecommendedProjects();
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) =>
          term === null || term.length === 0
            ? this.backendService.getRecommendedProjects()
            : this.backendService.getProjectSearchResult(term)
        )
      )
      .subscribe(results => (this.searchResult$ = of(results)));
  }

  ngAfterViewInit(): void {
    this.search(null);
  }

  fetchDefaultRecommendedProjects(): void {
    this.searchResult$ = this.backendService.getRecommendedProjects();
  }

  fetchRecommendedProjects(): void {
    const recommendedProjects$ = this.backendService.getRecommendedProjects();
    this.searchResult$ = merge(
      recommendedProjects$,
      this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) =>
          term === null || term.length === 0
            ? recommendedProjects$
            : this.backendService.getProjectSearchResult(term)
        )
      )
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  changeProject(event: MatSelectionListChange): void {
    this.projectToSet.emit(event.source.selectedOptions.selected[0]?.value);
  }
}
