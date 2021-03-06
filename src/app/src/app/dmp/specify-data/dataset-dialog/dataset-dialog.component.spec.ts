import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DatasetDialogComponent} from './dataset-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {closedDatasetMock} from '../../../../../mocks/dataset-mocks';
import {FormService} from '../../../../../services/form.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataSource} from '../../../../../domain/enum/data-source.enum';
import {MatSelectModule} from '@angular/material/select';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {IdentifierType} from '../../../../../domain/enum/identifier-type.enum';

describe('DatasetDialogComponent', () => {
  let component: DatasetDialogComponent;
  let fixture: ComponentFixture<DatasetDialogComponent>;
  let formServiceStub: Partial<FormService>;

  beforeEach(async () => {
    formServiceStub = {
      createDatasetFormGroup(title: string): FormGroup {
        return new FormGroup({
          title: new FormControl(title),
          source: new FormControl(DataSource.REUSED),
          type: new FormControl([]),
          size: new FormControl(0),
          datasetId: new FormControl({
            identifier: 'XXXXX',
            type: IdentifierType.DOI
          })
        });
      }
    };
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSelectModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule],
      declarations: [DatasetDialogComponent],
      providers: [
        {provide: MatDialogRef, useValue: {close: (value?: any) => value}},
        {provide: FormService, useValue: formServiceStub},
        {provide: MAT_DIALOG_DATA, useValue: {dataset: closedDatasetMock, mode: 'edit'}}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog without change', () => {
    spyOn(component.dialogRef, 'close');
    component.onNoClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should close dialog with change', () => {
    spyOn(component.dialogRef, 'close');
    component.onDialogClose();
    expect(component.dialogRef.close).toHaveBeenCalledWith(
      {
        title: closedDatasetMock.title, source: closedDatasetMock.source, type: closedDatasetMock.type,
        size: closedDatasetMock.size, datasetId: closedDatasetMock.datasetId
      }
    );
  });
});
