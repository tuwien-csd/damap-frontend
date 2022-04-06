import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpecifyDataComponent} from './specify-data.component';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {StepIntroComponent} from '../../widgets/step-intro/step-intro.component';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';
import {MatTabsModule} from '@angular/material/tabs';

describe('SpecifyDataComponent', () => {
  let component: SpecifyDataComponent;
  let fixture: ComponentFixture<SpecifyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatTabsModule, MatDialogModule, MatRadioModule, TranslateTestingModule],
      declarations: [SpecifyDataComponent, StepIntroComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifyDataComponent);
    component = fixture.componentInstance;
    component.specifyDataStep = new FormGroup({
      kind: new FormControl(null),
      explanation: new FormControl('')
    });
    component.datasets = new FormArray([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
