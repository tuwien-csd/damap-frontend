import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EthicalAspectsComponent} from './ethical-aspects.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';

describe('EthicalAspectsComponent', () => {
  let component: EthicalAspectsComponent;
  let fixture: ComponentFixture<EthicalAspectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatRadioModule, TranslateTestingModule],
      declarations: [EthicalAspectsComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EthicalAspectsComponent);
    component = fixture.componentInstance;
    component.legalEthicalStep = new FormGroup({
      humanParticipants: new FormControl(false),
      ethicalIssues: new FormControl(false),
      committeeReviewed: new FormControl(false)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
