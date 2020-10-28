import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {BackendService} from "../../services/backend.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

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
export class RepoComponent implements OnInit {

  @Input() dmpForm;
  private backendRepos: any = []; // Repo list loaded from backend
  repoList: any = []; // Filtered repo list (repo list minus selected repos)
  reposSelected: any = []; // selected repos

  repoStep: FormArray;

  readonly tableHeaders: string[] = ['expand', 'title', 'add'];
  expandedElement: any | null;
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  reposLoaded: boolean = false;

  constructor(private backendService: BackendService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.repoStep = this.dmpForm.get('hosts') as FormArray;
  }

  getRepositories() {
    this.backendService.getRepositories().subscribe((data: JSON) => {
      this.backendRepos = data;
      this.filterRepos();
      this.reposLoaded = true;
    });
  }

  getRepoDetails(repo) {
    if(!repo.info){
      let repoInfo;
      this.backendService.getRepositoryById(repo.id).subscribe((data: JSON) => {
        repoInfo = data;
        if (repoInfo && this.backendRepos.length > 0) {
          const index = this.backendRepos.map(e => e.id).indexOf(repo.id);
          this.backendRepos[index].info = repoInfo;
        }
        this.filterRepos();
      });
    }
  }

  get datasets() {
    const data = this.dmpForm.get('data') as FormGroup;
    return data.get('datasets') as FormArray;
  }

  // Filter selected repos from repo list
  private filterRepos(): void {
    this.repoList = Object.assign([], this.backendRepos);
    if (this.reposSelected.length > 0) {
      for (let entry of this.reposSelected) {
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

  addRepo(repo: any) {
    let repoGroup = this.formBuilder.group({
      id: repo.id,
      name: repo.name,
      datasets: [''],
      date: ['']
    });
    this.repoStep.push(repoGroup);
  }

  removeRepo(index: number): void {
    this.repoStep.removeAt(index);
  }
}
