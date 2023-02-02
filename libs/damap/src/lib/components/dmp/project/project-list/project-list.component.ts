import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { BackendService, SearchResult } from '@damap/core';
import {
  debounceTime,
  distinctUntilChanged, Observable, Subject, switchMap
} from 'rxjs';
import { Project } from '../../../../domain/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent {
  @Input() selectedProject: Project;
  @Output() projectToSet = new EventEmitter<Project>();

  private searchTerms = new Subject<string>();
  searchResult$: Observable<SearchResult<Project>>;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.searchResult$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.backendService.getProjectSearchResult(term);
      })
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  changeProject(event: MatSelectionListChange): void {
    this.projectToSet.emit(event.source.selectedOptions.selected[0]?.value);
  }
}
