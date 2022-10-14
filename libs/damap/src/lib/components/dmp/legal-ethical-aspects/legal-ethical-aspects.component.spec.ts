import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LegalEthicalAspectsComponent} from './legal-ethical-aspects.component';
import {UntypedFormControl, UntypedFormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {StepIntroComponent} from '../../../widgets/step-intro/step-intro.component';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';

describe('LegalEthicalAspectsComponent', () => {
  let component: LegalEthicalAspectsComponent;
  let fixture: ComponentFixture<LegalEthicalAspectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatRadioModule, TranslateTestingModule],
      declarations: [LegalEthicalAspectsComponent, StepIntroComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalEthicalAspectsComponent);
    component = fixture.componentInstance;
    component.legalEthicalStep = new UntypedFormGroup({
      sensitiveData: new UntypedFormControl(true),
      sensitiveDataAccess: new UntypedFormControl(''),
      personalData: new UntypedFormControl(true),
      otherPersonalDataCompliance: new UntypedFormControl([]),
      otherDataSecurityMeasures: new UntypedFormControl(''),
      legalRestrictions: new UntypedFormControl(true),
      legalRestrictionsComment: new UntypedFormControl(''),
      otherLegalRestrictionsDocuments: new UntypedFormControl(''),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
