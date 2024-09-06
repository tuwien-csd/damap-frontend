import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DmpComponent } from './dmp.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendService } from '../../services/backend.service';
import { FeedbackService } from '../../services/feedback.service';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatStepperHarness } from '@angular/material/stepper/testing';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';
import { FormTestingModule } from '../../testing/form-testing/form-testing.module';
import { AuthService } from '../../auth/auth.service';
import { completeDmp } from '../../mocks/dmp-mocks';
import { of, Subject } from 'rxjs';
import { mockContributor1 } from '../../mocks/contributor-mocks';
import { configMockData } from '../../mocks/config-service-mocks';
import { Config } from '../../domain/config';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { selectForm } from '../../store/selectors/form.selectors';

describe('DmpComponent', () => {
  let component: DmpComponent;
  let fixture: ComponentFixture<DmpComponent>;
  let loader: HarnessLoader;
  let authSpy;
  let backendSpy: jasmine.SpyObj<BackendService>;
  let loadServiceConfigSpy;
  let feedbackSpy;
  let storeMock;
  const initialState = {
    damap: {
      form: { dmp: null, changed: false },
    },
  };

  beforeEach(waitForAsync(() => {
    authSpy = jasmine.createSpyObj('AuthService', ['getUsername', 'isAdmin']);
    authSpy.getUsername.and.returnValue('name');
    authSpy.isAdmin.and.returnValue(false);
    feedbackSpy = jasmine.createSpyObj('FeedbackService', ['error', 'success']);
    backendSpy = jasmine.createSpyObj(
      Object.getOwnPropertyNames(BackendService.prototype),
    );
    loadServiceConfigSpy = backendSpy.loadServiceConfig.and.returnValue(
      of(configMockData),
    );
    backendSpy.getDmpById.and.returnValue(of(completeDmp));
    backendSpy.getProjectMembers.and.returnValue(of([mockContributor1]));

    storeMock = {
      pipe: jasmine.createSpy().and.returnValue(of({})),
      dispatch: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatStepperModule,
        MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          /*{path: 'plans', component: PlansComponent}*/
        ]),
        TranslateTestingModule,
        FormTestingModule,
      ],
      declarations: [DmpComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AuthService, useValue: authSpy },
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (id: number) => completeDmp.id } },
          },
        },
        { provide: BackendService, useValue: backendSpy },
        { provide: FeedbackService, useValue: feedbackSpy },
        provideMockStore({
          selectors: [
            {
              selector: selectForm,
              value: {
                id: 3,
                title: null,
                created: '2024-09-05T11:36:35.212Z',
                modified: '2024-09-16T13:26:53.392Z',
                description: null,
                project: {
                  id: 119,
                  acronym: 'PROJ.HORIZON-EUROPE',
                  universityId: 'uniProjectIdHorizonEurope0',
                  description:
                    'This project is funded by the EU and is recommended.',
                  title: 'Horizon Europe Sample Project',
                  funding: {
                    id: 117,
                    fundingName: null,
                    fundingProgram: null,
                    funderId: {
                      identifier: '501100000780',
                      type: 'FUNDREF',
                    },
                    grantId: {
                      identifier: null,
                      type: null,
                    },
                    fundingStatus: 'GRANTED',
                  },
                  start: '2022-01-01T00:00:00.000Z',
                  end: '2024-12-31T00:00:00.000Z',
                  dmpExists: false,
                  funderSupported: true,
                },
                dataKind: 'SPECIFY',
                reusedDataKind: 'UNKNOWN',
                contributors: [],
                noDataExplanation: null,
                metadata: null,
                dataGeneration: null,
                structure: null,
                dataQuality: [],
                otherDataQuality: null,
                targetAudience: null,
                tools: null,
                restrictedDataAccess: null,
                personalData: true,
                personalDataCris: true,
                personalDataCompliance: [],
                otherPersonalDataCompliance: null,
                sensitiveData: true,
                sensitiveDataCris: true,
                sensitiveDataSecurity: [],
                otherDataSecurityMeasures: null,
                sensitiveDataAccess: null,
                legalRestrictions: false,
                legalRestrictionsCris: false,
                legalRestrictionsDocuments: [],
                otherLegalRestrictionsDocument: null,
                legalRestrictionsComment: null,
                dataRightsAndAccessControl: null,
                humanParticipants: true,
                humanParticipantsCris: true,
                ethicalIssuesExist: true,
                ethicalIssuesExistCris: true,
                committeeReviewed: false,
                committeeReviewedCris: false,
                datasets: [],
                repositories: [],
                storage: [],
                externalStorage: [],
                externalStorageInfo: null,
                restrictedAccessInfo: null,
                closedAccessInfo: null,
                costsExist: false,
                costsExistCris: false,
                costs: [],
                documentation: null,
                contact: null,
              }, // Mock initial form state
            },
          ],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmpComponent);
    component = fixture.componentInstance;
    component.config$ = new Subject<Config>();
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load service config and publish he result into config$ observable', () => {
      component.ngOnInit();
      expect(loadServiceConfigSpy).toHaveBeenCalled();
      component.config$.subscribe(config =>
        expect(config).toEqual(configMockData),
      );
    });
  });

  it('should load all stepper harnesses and get steps of stepper', waitForAsync(async () => {
    const steppers = await loader.getAllHarnesses(MatStepperHarness);
    expect(steppers.length).toBe(1);

    const stepper = await loader.getHarness(MatStepperHarness);
    const steps = await stepper.getSteps();
    expect(steps.length).toEqual(11);
  }));

  it('should reset form and dispatch store calls on destroy', () => {
    spyOn(component, 'ngOnDestroy');

    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();

    fixture.destroy();

    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

  it('should test showStep', () => {
    expect(component.showStep).toBeFalsy();

    component.datasets.push(new UntypedFormControl({}));
    expect(component.showStep).toBeTruthy();
  });

  it('should fetch project members onInit', () => {
    expect(backendSpy.getDmpById).toHaveBeenCalledTimes(1);
  });
});
