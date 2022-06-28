import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DatasetDialogComponent} from './dataset-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {closedDatasetMock} from '../../../../../mocks/dataset-mocks';
import {FormService} from '../../../../../services/form.service';
import {FormControl, FormGroup} from '@angular/forms';
import {DataSource} from '../../../../../domain/enum/data-source.enum';

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
        });
      }
    };
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [DatasetDialogComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
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
});
