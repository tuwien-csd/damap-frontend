import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DmpComponent} from './dmp.component';
import {OAuthService} from 'angular-oauth2-oidc';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {BackendService} from '../services/backend.service';
import {FeedbackService} from '../services/feedback.service';
import {FormService} from '../services/form.service';
import {FormControl, FormGroup} from '@angular/forms';
import {LoadingState} from '../domain/enum/loading-state.enum';

describe('DmpComponent', () => {
  let component: DmpComponent;
  let fixture: ComponentFixture<DmpComponent>;
  let store: MockStore;
  const initialState = {
    projects: {projects: [], loaded: LoadingState.LOADED},
    repositories: {ids: [], entities: {}, filters: [], loaded: LoadingState.LOADED}
  };

  beforeEach(async () => {
    const oauthSpy = jasmine.createSpyObj('OAuthService', ['getIdentityClaims']);
    oauthSpy.getIdentityClaims.and.returnValue({name: 'name', groups: 'groups', preferred_username: 'username'});
    const formSpy = jasmine.createSpyObj('FormService',
      ['createDmpForm', 'exportFormToDmp', 'addContributorToForm', 'removeContributorFromForm',
        'addDatasetToForm', 'updateDatasetOfForm', 'addFileAnalysisAsDatasetToForm', 'removeDatasetFromForm',
        'addStorageToForm', 'removeStorageFromForm', 'addExternalStorageToForm', 'removeExternalStorageFromForm',
        'addRepositoryToForm', 'removeRepositoryFromForm', 'addCostToForm', 'removeCostFromForm', 'mapDmpToForm']);
    formSpy.createDmpForm.and.returnValue(new FormGroup({
      project: new FormControl()
    }));
    const backendSpy = jasmine.createSpyObj('BackendService',
      ['getDmpById', 'getProjectMembers', 'editDmp', 'createDmp', 'analyseFileData']);
    const feedbackSpy = jasmine.createSpyObj('FeedbackService', ['error', 'success']);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [/*{path: 'plans', component: PlansComponent}*/]
        )
      ],
      declarations: [DmpComponent],
      providers: [
        {provide: OAuthService, useValue: oauthSpy},
        {provide: FormService, useValue: formSpy},
        provideMockStore({initialState}),
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: (id: number) => null}}}},
        {provide: BackendService, useValue: backendSpy},
        {provide: FeedbackService, useValue: feedbackSpy}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmpComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
