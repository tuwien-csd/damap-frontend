import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataDeletionComponent} from './data-deletion.component';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';

describe('DataDeletionComponent', () => {
  let component: DataDeletionComponent;
  let fixture: ComponentFixture<DataDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSliderModule],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
