import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {Contributor} from "../../model/contributor";
import {Dmp} from "../../model/dmp";
import {Observable, Subject} from "rxjs";
import {Project} from "../../model/project";

@Component({
  selector: 'app-dmp-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  @Input() dmp: Dmp;
  @Input() people: Contributor[];
  contributorList: Contributor[] = [];

  @Output() contributorToAdd = new EventEmitter<Contributor>();
  @Output() contributorToRemove = new EventEmitter<Contributor>();

  // todo: search
  contributors$: Observable<Project[]>;
  private searchTerms = new Subject<string>();

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.getPeople();
  }

  addContributor(contributor: Contributor) {
    this.contributorToAdd.emit(contributor);
  }

  removeContributor(contributor: Contributor) {
    this.contributorToRemove.emit(contributor);
  }

  addContributorRole(contributor: Contributor, role: string) {

  }

  private getPeople(): void {
    this.backendService.getPersons()
      .subscribe(people => {
        this.people = people;
      })
  }

  private filterContributors(): void {
    this.contributorList = Object.assign([], this.people)
  }
}
