import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataDeletionComponent} from './data-deletion.component';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';
import {mockContributor1, mockContributor2} from '../../mocks/contributor-mocks';

describe('DataDeletionComponent', () => {
  let component: DataDeletionComponent;
  let fixture: ComponentFixture<DataDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSliderModule, TranslateTestingModule],
      declarations: [DataDeletionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDeletionComponent);
    component = fixture.componentInstance;
    component.dataset = new FormGroup({
      delete: new FormControl(true),
      dateOfDeletion: new FormControl(null),
      reasonForDeletion: new FormControl('reason')
    });
    component.dmpForm = new FormGroup({
      repositories: new FormArray([])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test compare function', () => {
    expect(component.getSelection(mockContributor1, mockContributor2)).toBe(false);
    expect(component.getSelection(mockContributor1, mockContributor1)).toBe(true);
    expect(component.getSelection(mockContributor1, null)).toBe(false);
    expect(component.getSelection(null, null)).toBe(true);
  });

  it('should check if dataset will be published', () => {
    component.dmpForm = new FormGroup({
      repositories: new FormArray([
        new FormControl({datasets: ['ref1']}),
        new FormControl({datasets: ['ref1']})
      ])
    });
    component.dataset = new FormGroup({
      referenceHash: new FormControl('ref1')
    });

    expect(component.willBePublished).toBe(true);


    component.dataset = new FormGroup({
      referenceHash: new FormControl('ref2')
    });

    expect(component.willBePublished).toBe(false);
  });
});
