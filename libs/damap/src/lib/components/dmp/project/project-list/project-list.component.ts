import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { BackendService } from '../../../../services/backend.service';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { Project } from '../../../../domain/project';
import { SearchResult } from '../../../../domain/search/search-result';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit, AfterViewInit {
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
        if (term === null || term.length === 0) {
          return this.backendService.getRecommendedProjects();
        } else {
          return this.backendService.getProjectSearchResult(term);
        }
      })
    );
  }

  ngAfterViewInit(): void {
    this.search(null);
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  changeProject(event: MatSelectionListChange): void {
    this.projectToSet.emit(event.source.selectedOptions.selected[0]?.value);
  }
}
