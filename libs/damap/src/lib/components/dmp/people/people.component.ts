import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ContributorRole } from '../../../domain/enum/contributor-role.enum';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { Contributor } from '../../../domain/contributor';
import { IdentifierType } from '../../../domain/enum/identifier-type.enum';
import { Observable, Subject, switchMap } from 'rxjs';
import { BackendService } from '../../../services/backend.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Dataset } from '../../../domain/dataset';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceConfig } from '../../../domain/config-services';

@Component({
  selector: 'app-dmp-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
  @Input() projectMembers: Contributor[];
  @Input() dmpForm: UntypedFormGroup;

  @Output() contactPerson = new EventEmitter<any>();
  @Output() contributorToAdd = new EventEmitter<any>();
  @Output() contributorToRemove = new EventEmitter<any>();
  @Output() contributorToUpdate = new EventEmitter<any>();

  readonly roles: any = ContributorRole;
  readonly identifierType = IdentifierType;
  readonly translateEnumPrefix = 'enum.contributor.role.'

  private searchTerms = new Subject<string>();

  searchResult$: Observable<Contributor[]>;
  serviceConfig$: ServiceConfig[];
  serviceConfigType: ServiceConfig;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.backendService.loadServiceConfig().subscribe(service => {
      this.serviceConfig$ = service.personSearchServiceConfigs;
      this.serviceConfigType = this.serviceConfig$[0];
    });
    this.searchResult$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.backendService.getPersonSearchResult(term, this.serviceConfigType.displayText)
      )
    );
  }

  changeContactPerson(contact: Contributor): void {
    this.contactPerson.emit(contact);
  }

  addContributor(contributor: Contributor): void {
    this.contributorToAdd.emit(contributor);
  }

  removeContributor(index: number): void {
    const contributor = (
      this.dmpForm.controls.contributors as UntypedFormArray
    ).at(index).value;
    const datasets = this.getDatasetsForContributor(contributor);
    if (!datasets.length) {
      this.contributorToRemove.emit(index);
    } else {
      const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
        data: datasets,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.contributorToRemove.emit(index);
        }
      });
    }
  }

  searchContributor(term: string): void {
    this.searchTerms.next(term);
  }

  get contributors(): UntypedFormArray {
    return this.dmpForm.get('contributors') as UntypedFormArray;
  }

  private getDatasetsForContributor(contributor: Contributor): Dataset[] {
    const datasets = this.dmpForm.controls.datasets.value;
    return datasets.filter(
      (item) => item.deletionPerson?.id === contributor?.id
    );
  }
}

@Component({
  selector: 'app-confirm-deletion-dialog',
  templateUrl: 'confirm-deletion-dialog.html',
})
export class ConfirmDeletionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Dataset[]) {}
}
