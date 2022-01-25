import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LegalEthicalAspectsComponent} from './legal-ethical-aspects.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {StepIntroComponent} from '../../widgets/intro/step-intro.component';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';

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
    component.legalEthicalStep = new FormGroup({
      sensitiveData: new FormControl(true),
      sensitiveDataAccess: new FormControl(''),
      personalData: new FormControl(true),
      otherPersonalDataCompliance: new FormControl([]),
      otherDataSecurityMeasures: new FormControl(''),
      legalRestrictions: new FormControl(true),
      legalRestrictionsComment: new FormControl(''),
      otherLegalRestrictionsDocuments: new FormControl(''),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
