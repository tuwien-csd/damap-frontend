import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Repository} from '../../domain/repository';
import {LoadingState} from '../../domain/enum/loading-state.enum';
import {Dataset} from '../../domain/dataset';

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

  @Input() loaded: LoadingState;
  @Input() repositories: Repository[]; // Repo list loaded from backend
  repoList: any = []; // Filtered repo list (repo list minus selected repos)

  @Input() dmpForm: FormGroup;
  @Input() repoStep: FormArray;
  @Input() datasets: FormArray;

  @Output() repositoryToAdd = new EventEmitter<any>();
  @Output() repositoryToRemove = new EventEmitter<any>();
  @Output() repositoryDetails = new EventEmitter<any>();

  readonly tableHeaders: string[] = ['expand', 'title', 'add'];
  expandedElement: any | null;
  dataSource = new MatTableDataSource<Repository>();

  LoadingState = LoadingState;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit(): void {
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

  getDatasetsMarkedForDeletion(index: number): Dataset[] {
    const repo = this.repoStep.at(index);
    return this.datasets.value.filter(item => item.delete && repo.value.datasets.includes(item.referenceHash));
  }

  getDatasetsMarkedForDeletionAsString(index: number): string {
    const datasets: Dataset[] = this.getDatasetsMarkedForDeletion(index);
    let result = '';
    for (const [i, item] of datasets.entries()) {
      result += '\"' + item.title + '\"';
      result += (i < datasets.length - 1) ? ', ' : '';
    }
    return result;
  }
}
