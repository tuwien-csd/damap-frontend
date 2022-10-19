import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../../services/backend.service';
import {UntypedFormArray, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {Observable, Subject, Subscription} from 'rxjs';
import {Contributor} from '../../domain/contributor';
import {Project} from '../../domain/project';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/states/app.state';
import {selectProjects, selectProjectsLoaded} from '../../store/selectors/project.selectors';
import {LoadProjects} from '../../store/actions/project.actions';
import {FormService} from '../../services/form.service';
import {HttpEventType} from '@angular/common/http';
import {LoadingState} from '../../domain/enum/loading-state.enum';
import {OAuthService} from 'angular-oauth2-oidc';
import {formDiff, resetFormValue, setFormValue} from '../../store/actions/form.actions';
import {InternalStorage} from '../../domain/internal-storage';
import {Dataset} from '../../domain/dataset';
import {DataKind} from '../../domain/enum/data-kind.enum';
import {LoggerService} from '../../services/logger.service';

@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css']
})
export class DmpComponent implements OnInit, OnDestroy {

  username: string;

  dmpForm: UntypedFormGroup = this.formService.dmpForm;
  formChanged: boolean;

  // Steps
  projectStep: UntypedFormControl;
  contributorStep: UntypedFormArray;
  specifyDataStep: UntypedFormGroup;
  datasets: UntypedFormArray;
  docDataStep: UntypedFormGroup;
  legalEthicalStep: UntypedFormGroup;
  storageStep: UntypedFormArray;
  externalStorageStep: UntypedFormArray;
  externalStorageInfo: UntypedFormControl;
  repoStep: UntypedFormArray;
  reuseStep: UntypedFormGroup;
  costsStep: UntypedFormGroup;

  // Resources
  projectsLoaded$: Observable<LoadingState>;
  projects$: Observable<Project[]>;
  projectMembers: Contributor[];
  stepChanged$ = new Subject();

  fileUpload: { file: File, progress: number, finalized: boolean }[] = [];
  fileUploadSubscription: Subscription[] = [];

  constructor(
    private logger: LoggerService,
    private auth: OAuthService,
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router,
    private backendService: BackendService,
    public store: Store<AppState>,
  ) {
  }

  ngOnInit() {
    this.projectsLoaded$ = this.store.pipe(select(selectProjectsLoaded));
    this.projects$ = this.store.pipe(select(selectProjects));
    this.getDmpById();
    this.getSuggestedProjects();
    this.username = this.auth.getIdentityClaims()['preferred_username'];

    this.dmpForm.valueChanges.subscribe(value => {
      this.logger.debug('DMPform Update');
      this.logger.debug(value);
      this.store.dispatch(formDiff({newDmp: value}));
    });

    this.projectStep = this.dmpForm.get('project') as UntypedFormControl;
    this.contributorStep = this.dmpForm.get('contributors') as UntypedFormArray;
    this.specifyDataStep = this.dmpForm.get('data') as UntypedFormGroup;
    this.datasets = this.dmpForm.get('datasets') as UntypedFormArray;
    this.docDataStep = this.dmpForm.get('documentation') as UntypedFormGroup;
    this.legalEthicalStep = this.dmpForm.get('legal') as UntypedFormGroup;
    this.storageStep = this.dmpForm.get('storage') as UntypedFormArray;
    this.externalStorageStep = this.dmpForm.get('externalStorage') as UntypedFormArray;
    this.externalStorageInfo = this.dmpForm.get('externalStorageInfo') as UntypedFormControl;
    this.repoStep = this.dmpForm.get('repositories') as UntypedFormArray;
    this.reuseStep = this.dmpForm.get('reuse') as UntypedFormGroup;
    this.costsStep = this.dmpForm.get('costs') as UntypedFormGroup;
  }

  ngOnDestroy() {
    this.formService.resetForm();
    this.store.dispatch(resetFormValue());
  }

  get showStep() {
    return (this.specifyDataStep.value.kind === DataKind.SPECIFY || this.specifyDataStep.value.reusedKind === DataKind.SPECIFY) && this.datasets.length;
  }

  changeStep($event) {
    this.stepChanged$.next($event);
  }

  changeProject(project: Project) {
    if (project != null) {
      if (project.universityId) {
        this.getProjectMembers(project.universityId);
      }
      this.projectStep.setValue(project);
    } else {
      this.projectStep.reset();
    }
  }

  changeContactPerson(contact: Contributor) {
    this.formService.changeContactPerson(contact);
  }

  addContributor(contributor: Contributor) {
    this.formService.addContributorToForm(contributor);
  }

  removeContributor(index: number) {
    this.formService.removeContributorFromForm(index);
  }

  createDataset(title: string) {
    this.formService.addDatasetToForm(this.generateReferenceHash(), title);
  }

  addDataset(dataset: Dataset) {
    dataset.referenceHash = this.generateReferenceHash();
    this.formService.addReusedDatasetToForm(dataset);
  }

  updateDataset(event: { index: number, update: Dataset }) {
    this.formService.updateDatasetOfForm(event.index, event.update);
  }

  analyseFile(event: File) {
    const formData = new FormData();
    formData.append('file', event);
    const filename = event.name;
    const reference = this.generateReferenceHash();
    const upload = {file: event, progress: 0, finalized: false};
    this.fileUpload.push(upload);
    const uploadSub = this.backendService.analyseFileData(formData)
      .subscribe({
          next: (response) => {
            if (response.type === HttpEventType.UploadProgress) {
              upload.progress = Math.round(100 * (response.loaded / response.total));
            }
            if (response.type === HttpEventType.Response) {
              const dataset = response.body;
              dataset.title = filename;
              dataset.referenceHash = reference;
              this.formService.addFileAnalysisAsDatasetToForm(dataset);
            }
          },
          error: _ => upload.finalized = true,
          complete: () => upload.finalized = true
        }
      );
    this.fileUploadSubscription.push(uploadSub);
  }

  cancelFileUpload(index: number) {
    this.fileUploadSubscription[index].unsubscribe();
    this.fileUpload[index].finalized = true;
  }

  removeDataset(index: number) {
    this.formService.removeDatasetFromForm(index);
  }

  addStorage(storage: InternalStorage) {
    this.formService.addStorageToForm(storage);
  }

  removeStorage(index: number): void {
    this.formService.removeStorageFromForm(index);
  }

  addExternalStorage() {
    this.formService.addExternalStorageToForm();
  }

  removeExternalStorage(index: number): void {
    this.formService.removeExternalStorageFromForm(index);
  }

  addRepository(repo: { id: string, name: string }) {
    this.formService.addRepositoryToForm(repo);
  }

  removeRepository(index: number): void {
    this.formService.removeRepositoryFromForm(index);
  }

  addCost() {
    this.formService.addCostToForm();
  }

  removeCost(index: number) {
    this.formService.removeCostFromForm(index);
  }

  private getDmpById() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.logger.debug('Get DMP with ID: ' + id);
      this.backendService.getDmpById(id).subscribe(
        dmp => {
          if (dmp != null) {
            this.formService.mapDmpToForm(dmp);
            this.store.dispatch(setFormValue({dmp}));
            if (dmp.project) {
              this.projects$.subscribe(projects => projects.filter(e => {
                if (e.title === dmp.project.title && dmp.project.universityId) {
                  this.getProjectMembers(e.universityId);
                }
              }))
            }
          } else {
            this.router.navigate(['plans']);
          }
        });
    }
  }

  private getSuggestedProjects() {
    this.store.dispatch(new LoadProjects());
  }

  private getProjectMembers(projectId: number) {
    this.backendService.getProjectMembers(projectId)
      .subscribe(members => {
        this.projectMembers = members;
      });
  }

  private generateReferenceHash(): string {
    return this.username + (+new Date()).toString(36);
  }
}
