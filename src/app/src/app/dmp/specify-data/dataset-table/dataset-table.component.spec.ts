import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DatasetTableComponent} from './dataset-table.component';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslateTestingModule} from '../../../../../testing/translate-testing/translate-testing.module';
import {DatasetSourceModule} from '../../../pipe/dataset-source/dataset-source.module';
import {FormArray} from '@angular/forms';

describe('DatasetTableComponent', () => {
  let component: DatasetTableComponent;
  let fixture: ComponentFixture<DatasetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, TranslateTestingModule, DatasetSourceModule],
      declarations: [DatasetTableComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetTableComponent);
    component = fixture.componentInstance;
    component.datasets = new FormArray([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
