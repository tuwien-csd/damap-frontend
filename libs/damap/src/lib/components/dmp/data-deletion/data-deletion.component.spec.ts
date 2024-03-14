import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import {
  mockContributor1,
  mockContributor2,
} from '../../../mocks/contributor-mocks';

import { DataDeletionComponent } from './data-deletion.component';
import { MatSliderModule } from '@angular/material/slider';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';

describe('DataDeletionComponent', () => {
  let component: DataDeletionComponent;
  let fixture: ComponentFixture<DataDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSliderModule, TranslateTestingModule],
      declarations: [DataDeletionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDeletionComponent);
    component = fixture.componentInstance;
    component.dataset = new UntypedFormGroup({
      delete: new UntypedFormControl(true),
      dateOfDeletion: new UntypedFormControl(null),
      reasonForDeletion: new UntypedFormControl('reason'),
    });
    component.dmpForm = new UntypedFormGroup({
      repositories: new UntypedFormArray([]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test compare function', () => {
    expect(component.getSelection(mockContributor1, mockContributor2)).toBe(
      false,
    );
    expect(component.getSelection(mockContributor1, mockContributor1)).toBe(
      true,
    );
    expect(component.getSelection(mockContributor1, null)).toBe(false);
    expect(component.getSelection(null, null)).toBe(true);
  });
});
