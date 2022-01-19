import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CostsComponent} from './costs.component';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {StepIntroComponent} from '../../widgets/intro/step-intro.component';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';

describe('CostsComponent', () => {
  let component: CostsComponent;
  let fixture: ComponentFixture<CostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatExpansionModule, MatRadioModule, MatIconModule, TranslateTestingModule],
      declarations: [CostsComponent, StepIntroComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsComponent);
    component = fixture.componentInstance;
    component.costsStep = new FormGroup({
      exist: new FormControl(true),
      list: new FormArray([])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
