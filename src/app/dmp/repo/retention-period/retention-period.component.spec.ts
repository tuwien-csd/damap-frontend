import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RetentionPeriodComponent} from './retention-period.component';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';

describe('RetentionPeriodComponent', () => {
  let component: RetentionPeriodComponent;
  let fixture: ComponentFixture<RetentionPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatSelectModule, MatExpansionModule, NoopAnimationsModule, TranslateTestingModule],
      declarations: [RetentionPeriodComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetentionPeriodComponent);
    component = fixture.componentInstance;
    component.dmpForm = new FormGroup({
      datasets: new FormArray([
        new FormGroup({retentionPeriod: new FormControl(null)})
      ])
    });
    component.datasets = component.dmpForm.get('datasets') as FormArray;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log('retention');
  });
});
