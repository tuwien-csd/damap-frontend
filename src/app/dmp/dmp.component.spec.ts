import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DmpComponent} from './dmp.component';
import {OAuthService} from 'angular-oauth2-oidc';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {BackendService} from '../services/backend.service';
import {FeedbackService} from '../services/feedback.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {LoadingState} from '../domain/enum/loading-state.enum';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatStepperHarness} from '@angular/material/stepper/testing';
import {TranslateTestingModule} from '../testing/translate-testing/translate-testing.module';
import {FormTestingModule} from '../testing/form-testing/form-testing.module';

describe('DmpComponent', () => {
  let component: DmpComponent;
  let fixture: ComponentFixture<DmpComponent>;
  let loader: HarnessLoader;
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
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, MatStepperModule, MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes(
          [/*{path: 'plans', component: PlansComponent}*/]
        ),
        TranslateTestingModule,
        FormTestingModule
      ],
      declarations: [DmpComponent],
      providers: [
        {provide: OAuthService, useValue: oauthSpy},
        provideMockStore({initialState}),
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: (id: number) => null}}}},
        {provide: BackendService, useValue: backendSpy},
        {provide: FeedbackService, useValue: feedbackSpy}
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmpComponent);
    component = fixture.componentInstance;
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

  it('should reset form and dispatch store calls on destroy', () => {
    spyOn(component, 'ngOnDestroy');

    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();

    fixture.destroy();

    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

  it('should test showStep', () => {
    expect(component.showStep).toBeFalsy();

    component.datasets.push(new FormControl({}));
    expect(component.showStep).toBeTruthy();
  });

});
