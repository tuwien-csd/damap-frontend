import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { of } from 'rxjs';
import { mockContributor1 } from '../../mocks/contributor-mocks';

describe('DmpComponent', () => {
  let component: DmpComponent;
  let fixture: ComponentFixture<DmpComponent>;
  let loader: HarnessLoader;
  let authSpy;
  let backendSpy: jasmine.SpyObj<BackendService>;
  let feedbackSpy;
  const initialState = {
    damap: {
      form: { dmp: null, changed: false },
    },
  };

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['getUsername', 'isAdmin']);
    authSpy.getUsername.and.returnValue('name');
    authSpy.isAdmin.and.returnValue(false);
    feedbackSpy = jasmine.createSpyObj('FeedbackService', ['error', 'success']);
    backendSpy = jasmine.createSpyObj(
      Object.getOwnPropertyNames(BackendService.prototype)
    );
    backendSpy.getDmpById.and.returnValue(of(completeDmp));
    backendSpy.getProjectMembers.and.returnValue(of([mockContributor1]));

    await TestBed.configureTestingModule({
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
      ],
    }).compileComponents();
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

    component.datasets.push(new UntypedFormControl({}));
    expect(component.showStep).toBeTruthy();
  });

  it('should fetch project members onInit', () => {
    expect(backendSpy.getDmpById).toHaveBeenCalledTimes(1);
  });
});
