import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../services/backend.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Contributor} from '../domain/contributor';
import {Project} from '../domain/project';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/states/app.state';
import {selectProjects, selectProjectsLoaded} from '../store/selectors/project.selectors';
import {LoadProjects} from '../store/actions/project.actions';
import {FormService} from '../services/form.service';
import {Storage} from '../domain/storage';
import {FeedbackService} from '../services/feedback.service';
import {HttpEventType} from '@angular/common/http';
import {Location} from '@angular/common';
import {LoadingState} from '../domain/enum/loading-state.enum';
import {OAuthService} from 'angular-oauth2-oidc';
import {formDiff, resetFormValue, setFormValue} from '../store/actions/form.actions';
import {selectFormChanged} from '../store/selectors/form.selectors';
import {LoadDmps} from '../store/actions/dmp.actions';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css']
})
export class DmpComponent implements OnInit, OnDestroy {

  username: string;

  dmpForm: FormGroup = this.formService.dmpForm;
  formChanged: boolean;

  // Steps
  projectStep: FormControl;
  contributorStep: FormArray;
  specifyDataStep: FormGroup;
  datasets: FormArray;
  docDataStep: FormGroup;
  legalEthicalStep: FormGroup;
  storageStep: FormArray;
  externalStorageStep: FormArray;
  externalStorageInfo: FormControl;
  repoStep: FormArray;
  reuseStep: FormGroup;
  costsStep: FormGroup;

  // Resources
  projectsLoaded$: Observable<LoadingState>;
  projects$: Observable<Project[]>;
  projectMembers: Contributor[];
  formChanged$: Observable<boolean>;

  fileUpload: { file: File, progress: number, finalized: boolean }[] = [];
  fileUploadSubscription: Subscription[] = [];

  // TODO: Manage editability based on accessType (role)
  constructor(
    private auth: OAuthService,
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router,
    private backendService: BackendService,
    public store: Store<AppState>,
    private feedbackService: FeedbackService,
    private location: Location,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.projectsLoaded$ = this.store.pipe(select(selectProjectsLoaded));
    this.projects$ = this.store.pipe(select(selectProjects));
    this.formChanged$ = this.store.pipe(select(selectFormChanged));
    this.getDmpById();
    this.getSuggestedProjects();
    this.username = this.auth.getIdentityClaims()['preferred_username'];

    this.dmpForm.valueChanges.subscribe(value => {
      console.log('DMPform Update');
      console.log(value);
      this.store.dispatch(formDiff({newDmp: value}));
    });
    this.formChanged$.subscribe(value => this.formChanged = value);

    this.projectStep = this.dmpForm.get('project') as FormControl;
    this.contributorStep = this.dmpForm.get('contributors') as FormArray;
    this.specifyDataStep = this.dmpForm.get('data') as FormGroup;
    this.datasets = this.dmpForm.get('datasets') as FormArray;
    this.docDataStep = this.dmpForm.get('documentation') as FormGroup;
    this.legalEthicalStep = this.dmpForm.get('legal') as FormGroup;
    this.storageStep = this.dmpForm.get('storage') as FormArray;
    this.externalStorageStep = this.dmpForm.get('externalStorage') as FormArray;
    this.externalStorageInfo = this.dmpForm.get('externalStorageInfo') as FormControl;
    this.repoStep = this.dmpForm.get('hosts') as FormArray;
    this.reuseStep = this.dmpForm.get('reuse') as FormGroup;
    this.costsStep = this.dmpForm.get('costs') as FormGroup;
  }

  ngOnDestroy() {
    this.formService.resetForm();
    this.store.dispatch(resetFormValue());
    this.store.dispatch(new LoadDmps());
  }

  changeStep() {
    if (this.formChanged) {
      this.saveDmp();
    }
  }

  saveDmp(): void {
    const dmp = this.formService.exportFormToDmp();
    if (this.dmpForm.value.id) {
      this.backendService.editDmp(dmp).subscribe(
        response => {
          this.formService.mapDmpToForm(response);
          this.store.dispatch(setFormValue({dmp: response}));
        },
        () => {
        },
        () => this.translate.get('dmp.success.update').subscribe(value => this.feedbackService.success(value))
      );
    } else {
      this.backendService.createDmp(dmp).subscribe(
        response => {
          this.location.replaceState(`dmp/${response.id}`);
          this.formService.mapDmpToForm(response);
          this.store.dispatch(setFormValue({dmp: response}));
        },
        () => {
        },
        () => this.translate.get('dmp.success.save').subscribe(value => this.feedbackService.success(value))
      );
    }
  }

  changeProject(project: Project) {
    if (project != null) {
      // only set contact if none is selected yet
      if (!this.formService.getContactPerson()) {
        this.getProjectMembersAndSetContact(project.universityId);
      } else {
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

  addDataset(title: string) {
    this.formService.addDatasetToForm(this.generateReferenceHash(), title);
  }

  updateDataset(event: { index: number, update: FormGroup }) {
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
      .subscribe((response) => {
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
        _ => upload.finalized = true,
        () => upload.finalized = true
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

  addStorage(storage: Storage) {
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

  /*  getRepositoryDetails(repo: Repository) {
      if (!repo.info) {
        this.store.dispatch(new LoadRepository({id: repo.id}));
      }
    }*/

  addCost() {
    this.formService.addCostToForm();
  }

  removeCost(index: number) {
    this.formService.removeCostFromForm(index);
  }

  changeCrisValue(controlName: string) {
    this.formService.setCrisInfoToFalse(controlName);
  }

  private getDmpById() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log('Get DMP with ID: ' + id);
      this.backendService.getDmpById(id).subscribe(
        dmp => {
          if (dmp != null) {
            this.formService.mapDmpToForm(dmp);
            this.store.dispatch(setFormValue({dmp}));
            if (dmp.project) {
              this.projects$.subscribe(projects => projects.filter(e => {
                if (e.title === dmp.project.title) {
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

  private getProjectMembersAndSetContact(projectId: number) {
    this.backendService.getProjectMembers(projectId)
      .subscribe(members => {
        this.projectMembers = members;
        for (const member of members) {
          if (member.contact) {
            this.changeContactPerson(member);
            break;
          }
        }
      });
  }

  /*  private getRepositories() {
      this.repositoriesLoaded$.subscribe(loaded => {
        if (loaded === LoadingState.NOT_LOADED) {
          this.store.dispatch(new LoadAllRepositories());
        }
      });
    }*/

  // TODO: move to service, add for storage

  private generateReferenceHash(): string {
    return this.username + (+new Date()).toString(36);
  }
}
