import {Component, Input, OnInit, EventEmitter, Output, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Repository} from '../../domain/repository';
import {DataAccessType} from '../../domain/enum/data-access-type.enum';

@Component({
  selector: 'app-dmp-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RepoComponent implements OnInit, OnChanges {

  @Input() loaded: boolean;
  @Input() repositories: Repository[]; // Repo list loaded from backend
  repoList: any = []; // Filtered repo list (repo list minus selected repos)

  @Input() repoStep: FormArray;
  @Input() datasets: FormArray;
  @Input() restrictedAccessInfo: FormControl;
  @Input() closedAccessInfo: FormControl;

  @Output() repositoryToAdd = new EventEmitter<any>();
  @Output() repositoryToRemove = new EventEmitter<any>();
  @Output() repositoryDetails = new EventEmitter<any>();

  readonly tableHeaders: string[] = ['expand', 'title', 'add'];
  expandedElement: any | null;
  dataSource = new MatTableDataSource<Repository>();

  restricted: string[] = [];
  closed: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit(): void {
    this.datasets.valueChanges.subscribe(
      newVal => {
        this.restricted = [];
        this.closed = [];
        for (const val of newVal) {
          if(val.dataAccess === DataAccessType.restricted) {
            this.addRestricted(val.title);
          }
          if(val.dataAccess === DataAccessType.closed) {
            this.addClosed(val.title);
          }
        }
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.repositories) {
      // Timeout needed for paginator init
      setTimeout(_ => this.filterRepos(), 1);
    }
  }

  expandRow(repo: Repository) {
    this.expandedElement = this.expandedElement === repo.id ? null : repo.id;
    if (!repo.info) {
      this.getRepoDetails(repo);
    }
  }


  private getRepoDetails(repo: Repository) {
    this.repositoryDetails.emit(repo);
  }

  // Filter selected repos from repo list
  private filterRepos(): void {
    this.repoList = Object.assign([], this.repositories);
    for (const entry of this.repoStep.controls) {
      this.repoList = this.repoList.filter(e => !(e.id === entry.value.hostId));
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.repoList;
  }

  // Table Search Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addRepository(repo: Repository) {
    this.repositoryToAdd.emit(repo);
    this.filterRepos();
  }

  removeRepository(index: number): void {
    this.repositoryToRemove.emit(index);
    this.filterRepos();
  }

  private addRestricted(value: string) {
    this.restricted.push(value);
  }

  private addClosed(value: string) {
    this.closed.push(value);
  }

}
