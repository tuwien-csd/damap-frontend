import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ContributorRole} from '../../domain/enum/contributor-role.enum';
import {FormArray, FormGroup} from '@angular/forms';
import {Contributor} from '../../domain/contributor';
import {IdentifierType} from '../../domain/enum/identifier-type.enum';
import {Observable, Subject, switchMap} from 'rxjs';
import {BackendService} from '../../services/backend.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Dataset} from '../../domain/dataset';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

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

  constructor(private backendService: BackendService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.searchResult$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.backendService.searchPerson(term))
    );
  }

  changeContactPerson(contact: Contributor): void {
    this.contactPerson.emit(contact);
  }

  addContributor(contributor: Contributor): void {
    this.contributorToAdd.emit(contributor);
  }

  removeContributor(index: number): void {
    const contributor = (this.dmpForm.controls.contributors as FormArray).at(index).value;
    const datasets = this.getDatasetsForContributor(contributor);
    if (!datasets.length) {
      this.contributorToRemove.emit(index);
    } else {
      const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {data: datasets});
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.contributorToRemove.emit(index);
        }
      });
    }
  }

  searchContributor(term: string): void {
    this.searchTerms.next(term);
  }

  get contributors(): FormArray {
    return this.dmpForm.get('contributors') as FormArray;
  }

  private getDatasetsForContributor(contributor: Contributor): Dataset[] {
    const datasets = this.dmpForm.controls.datasets.value;
    return datasets.filter(item => item.deletionPerson?.id === contributor?.id);
  }

}


@Component({
  selector: 'app-confirm-deletion-dialog',
  templateUrl: 'confirm-deletion-dialog.html',
})
export class ConfirmDeletionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Dataset[]) {
  }
}
