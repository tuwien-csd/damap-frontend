import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DmpComponent} from './dmp.component';
import {OAuthService} from 'angular-oauth2-oidc';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {BackendService} from '../services/backend.service';
import {FeedbackService} from '../services/feedback.service';
import {FormService} from '../services/form.service';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LoadingState} from '../domain/enum/loading-state.enum';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {mockProject} from '../mocks/project-mocks';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatStepperHarness} from '@angular/material/stepper/testing';
import {TranslateTestingModule} from '../testing/translate-testing/translate-testing.module';

describe('DmpComponent', () => {
  let component: DmpComponent;
  let fixture: ComponentFixture<DmpComponent>;
  let loader: HarnessLoader;
  let formServiceStub: Partial<FormService>;
  let store: MockStore;
  let oauthSpy;
  let backendSpy;
  let feedbackSpy;
  const initialState = {
    form: {dmp: null, changed: false},
    projects: {projects: [], loaded: LoadingState.LOADED}
  };

  beforeEach(async () => {
    oauthSpy = jasmine.createSpyObj('OAuthService', ['getIdentityClaims']);
    oauthSpy.getIdentityClaims.and.returnValue({name: 'name', groups: 'groups', preferred_username: 'username'});
    feedbackSpy = jasmine.createSpyObj('FeedbackService', ['error', 'success']);
    formServiceStub = {
      get dmpForm(): FormGroup {
        return new FormGroup({
          project: new FormControl(),
          data: new FormGroup({kind: new FormControl('SPECIFY')}),
          datasets: new FormArray([]),
          documentation: new FormGroup({}),
          legal: new FormGroup({}),
          storage: new FormArray([]),
          externalStorage: new FormArray([]),
          externalStorageInfo: new FormControl(),
          repositories: new FormArray([]),
          reuse: new FormGroup({}),
          costs: new FormGroup({})
        })
      },
      resetForm() {
      }
    };
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, MatStepperModule, MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes(
          [/*{path: 'plans', component: PlansComponent}*/]
        ),
        TranslateTestingModule
      ],
      declarations: [DmpComponent],
      providers: [
        {provide: OAuthService, useValue: oauthSpy},
        {provide: FormService, useValue: formServiceStub},
        provideMockStore({initialState}),
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: (id: number) => null}}}},
        {provide: BackendService, useValue: backendSpy},
        {provide: FeedbackService, useValue: feedbackSpy}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmpComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all stepper harnesses and get steps of stepper', async () => {
    const steppers = await loader.getAllHarnesses(MatStepperHarness);
    expect(steppers.length).toBe(1);

    const stepper = await loader.getHarness(MatStepperHarness);
    const steps = await stepper.getSteps();
    expect(steps.length).toEqual(11);
  });

  it('should change step, edit form and change step', async () => {
    spyOn(component, 'saveDmp');

    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    const stepper = await loader.getHarness(MatStepperHarness);
    const steps = await stepper.getSteps();
    await steps[7].select();

    (component.dmpForm.get('project') as FormControl).setValue(mockProject);
    component.formChanged = true;
    await steps[1].select();

    expect(component.saveDmp).toHaveBeenCalledTimes(1);
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

  it('should reset form and dispatch store calls on destroy', () => {
    spyOn(component, 'ngOnDestroy');
    spyOn(formServiceStub, 'resetForm');

    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();

    fixture.destroy();

    expect(formServiceStub.resetForm).toHaveBeenCalledTimes(1);
    expect(storeSpy).toHaveBeenCalledTimes(2);
  });
});
