import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ServiceConfig } from '../../../domain/config-services';
import { SearchResult } from '../../../domain/search/search-result';
import { Contributor } from '../../../domain/contributor';
import { Dataset } from '../../../domain/dataset';
import { ContributorRole } from '../../../domain/enum/contributor-role.enum';
import { IdentifierType } from '../../../domain/enum/identifier-type.enum';
import { BackendService } from '../../../services/backend.service';
import { PersonSearchComponent } from '../../../widgets/person-search/person-search.component';

@Component({
  selector: 'app-dmp-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit, OnDestroy {
  @ViewChild(PersonSearchComponent) personSearch: PersonSearchComponent;

  @Input() projectMembers: Contributor[];
  @Input() dmpForm: UntypedFormGroup;

  @Output() contactPerson = new EventEmitter<any>();
  @Output() contributorToAdd = new EventEmitter<any>();
  @Output() contributorToRemove = new EventEmitter<any>();
  @Output() contributorToUpdate = new EventEmitter<any>();

  readonly roles: any = ContributorRole;
  readonly identifierType = IdentifierType;
  readonly translateEnumPrefix = 'enum.contributor.role.';

  private searchTerms = new Subject<string>();
  private subscriptions: Subscription[] = [];

  searchResult$: Observable<SearchResult<Contributor>>;
  serviceConfig$: ServiceConfig[];
  serviceConfigType: ServiceConfig;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.backendService.loadServiceConfig().subscribe(service => {
      this.serviceConfig$ = service.personSearchServiceConfigs;
      this.serviceConfigType = service.personSearchServiceConfigs[0];
    });

    const searchSubscription = this.searchTerms
      .pipe(debounceTime(300))
      .subscribe((term: string) => {
        this.searchResult$ = this.backendService.getPersonSearchResult(
          term,
          this.serviceConfigType.displayText
        );
      });
    this.subscriptions.push(searchSubscription);
  }

  onServiceConfigChange(serviceConfigType: ServiceConfig) {
    this.serviceConfigType = serviceConfigType;
    this.searchTerms.next(this.personSearch.currentSearchTerm);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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

  get contributors(): UntypedFormArray {
    return this.dmpForm.get('contributors') as UntypedFormArray;
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: Dataset[]) {}
}
