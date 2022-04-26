import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContributorRole} from '../../domain/enum/contributor-role.enum';
import {FormArray, FormGroup} from '@angular/forms';
import {Contributor} from '../../domain/contributor';
import {IdentifierType} from '../../domain/enum/identifier-type.enum';
import {Observable, Subject, switchMap} from 'rxjs';
import {BackendService} from '../../services/backend.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-dmp-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  @Input() projectMembers: Contributor[];

  readonly roles: any = ContributorRole;
  readonly identifierType = IdentifierType;

  readonly translateEnumPrefix = 'enum.contributor.role.'

  @Input() dmpForm: FormGroup;

  @Output() contactPerson = new EventEmitter<any>();
  @Output() contributorToAdd = new EventEmitter<any>();
  @Output() contributorToRemove = new EventEmitter<any>();
  @Output() contributorToUpdate = new EventEmitter<any>();

  private searchTerms = new Subject<string>();
  searchResult$: Observable<Contributor[]>;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.searchResult$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.backendService.searchPerson(term))
    );
  }

  changeContactPerson(contact: Contributor) {
    this.contactPerson.emit(contact);
  }

  addContributor(contributor: Contributor) {
    this.contributorToAdd.emit(contributor);
  }

  removeContributor(index: number) {
    this.contributorToRemove.emit(index);
  }

  searchContributor(term: string) {
    this.searchTerms.next(term);
  }

  get contributors(): FormArray {
    return this.dmpForm.get('contributors') as FormArray;
  }

}
