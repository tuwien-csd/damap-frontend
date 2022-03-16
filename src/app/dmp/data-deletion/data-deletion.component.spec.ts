import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataDeletionComponent} from './data-deletion.component';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';

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
});
