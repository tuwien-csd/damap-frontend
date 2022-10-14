import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DatasetTableComponent} from './dataset-table.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';
import {DatasetSourceModule} from '../../../../pipes/dataset-source/dataset-source.module';
import {UntypedFormArray, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';

describe('DatasetTableComponent', () => {
  let component: DatasetTableComponent;
  let fixture: ComponentFixture<DatasetTableComponent>;
  let formGroup1: UntypedFormGroup;
  let formGroup2: UntypedFormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, TranslateTestingModule, DatasetSourceModule, NoopAnimationsModule],
      declarations: [DatasetTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetTableComponent);
    component = fixture.componentInstance;
    formGroup1 = new UntypedFormGroup({
      id: new UntypedFormControl(0),
      referenceHash: new UntypedFormControl('abc'),
    });
    formGroup2 = new UntypedFormGroup({
      id: new UntypedFormControl(1),
      referenceHash: new UntypedFormControl('xyz'),
    });
    component.datasets = new UntypedFormArray([formGroup1, formGroup2]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open DatasetDialogComponent', async () => {
    spyOn(component.updateDataset, 'emit');
    spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => of(formGroup2.getRawValue())} as MatDialogRef<unknown>);
    component.openDatasetDialog(formGroup2.getRawValue());
    expect(component.updateDataset.emit).toHaveBeenCalledOnceWith({index: 1, update: formGroup2.getRawValue()});
  });

  it('should remove dataset', () => {
    spyOn(component.removeDataset, 'emit');
    component.remove(formGroup1.getRawValue());
    expect(component.removeDataset.emit).toHaveBeenCalledOnceWith(0);
  });
});
