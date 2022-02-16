import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Repository} from '../../../domain/repository';
import {LoadingState} from '../../../domain/enum/loading-state.enum';
import {MatPaginator} from '@angular/material/paginator';
import {Host} from '../../../domain/host';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-repo-table',
  templateUrl: './repo-table.component.html',
  styleUrls: ['./repo-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RepoTableComponent implements OnChanges, AfterViewInit {

  @Input() datasets: boolean;
  @Input() selectedRepos: Host[];
  @Input() loaded: LoadingState;
  @Input() repositories: Repository[]; // Repo list loaded from backend
  repoList: any = []; // Filtered repo list (repo list minus selected repos)

  @Output() repositoryToAdd = new EventEmitter<any>();
  @Output() repositoryDetails = new EventEmitter<any>();

  readonly tableHeaders: string[] = ['expand', 'title', 'add'];
  expandedElement: string | null;
  dataSource = new MatTableDataSource<Repository>();

  readonly LoadingState = LoadingState;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.repositories || changes.selectedRepos) {
      // Timeout needed for paginator init
      setTimeout(_ => this.filterRepos(), 1);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  expandRow(repo: Repository) {
    this.expandedElement = this.expandedElement === repo.id ? null : repo.id;
    if (!repo.description) {
      this.getRepoDetails(repo);
    }
  }

  addRepository(repo: Repository) {
    this.repositoryToAdd.emit(repo);
  }

  // Table Search Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getRepoDetails(repo: Repository) {
    this.repositoryDetails.emit(repo);
  }

  // Filter selected repos from repo list
  private filterRepos(): void {
    this.repoList = Object.assign([], this.repositories);
    for (const entry of this.selectedRepos) {
      this.repoList = this.repoList.filter(e => !(e.id === entry.hostId));
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.repoList;
  }

}
