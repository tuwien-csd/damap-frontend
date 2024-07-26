import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { BackendService } from '../../../../services/backend.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReusedDataComponent } from './reused-data.component';
import { of } from 'rxjs';
import { restrictedDatasetMock } from '../../../../mocks/dataset-mocks';

describe('ReusedDataComponent', () => {
  let component: ReusedDataComponent;
  let fixture: ComponentFixture<ReusedDataComponent>;
  let backendSpy;

  beforeEach(waitForAsync(() => {
    backendSpy = jasmine.createSpyObj('BackendService', ['searchDataset']);
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ReusedDataComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: BackendService, useValue: backendSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusedDataComponent);
    component = fixture.componentInstance;
    component.specifyDataStep = new UntypedFormGroup({
      reusedKind: new UntypedFormControl(undefined),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search and add dataset with doi', () => {
    spyOn(component.datasetToAdd, 'emit');
    backendSpy.searchDataset.and.returnValue(of(restrictedDatasetMock));
    component.searchDataset('doi:10.12345/12345');

    expect(backendSpy.searchDataset).toHaveBeenCalledOnceWith(
      'doi:10.12345/12345',
    );
    expect(component.datasetToAdd.emit).toHaveBeenCalledOnceWith(
      restrictedDatasetMock,
    );
  });
});
