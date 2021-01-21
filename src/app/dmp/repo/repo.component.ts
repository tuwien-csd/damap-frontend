import {Component, Input, OnInit, EventEmitter, Output, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import {FormArray} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {BackendService} from '../../services/backend.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

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

  @Input() repositories: any; // Repo list loaded from backend
  repoList: any = []; // Filtered repo list (repo list minus selected repos)
  reposSelected: any = []; // selected repos

  @Input() repoStep: FormArray;
  @Input() datasets: FormArray;

  @Output() repositoryToAdd = new EventEmitter<any>();
  @Output() repositoryToRemove = new EventEmitter<any>();
  @Output() repositoryDetails = new EventEmitter<any>();

  readonly tableHeaders: string[] = ['expand', 'title', 'add'];
  expandedElement: any | null;
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.repositories && this.repositories) {
      this.filterRepos();
    }
  }

  getRepoDetails(repo) {
    this.repositoryDetails.emit(repo);
  }

  // Filter selected repos from repo list
  private filterRepos(): void {
    this.repoList = Object.assign([], this.repositories);
    if (this.reposSelected.length > 0) {
      for (const entry of this.reposSelected) {
        this.repoList = this.repoList.filter(e => e !== entry);
      }
    }
    this.dataSource.data = this.repoList;
    this.dataSource.paginator = this.paginator;
  }

  // Table Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addRepository(repo: any) {
    this.repositoryToAdd.emit(repo);
  }

  removeRepository(index: number): void {
    this.repositoryToRemove.emit(index);
  }

}
