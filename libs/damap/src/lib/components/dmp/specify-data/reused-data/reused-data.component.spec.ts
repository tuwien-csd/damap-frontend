import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReusedDataComponent} from './reused-data.component';
import {BackendService} from '../../../../services/backend.service';
import {MatDialogModule} from '@angular/material/dialog';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {restrictedDatasetMock} from '../../../../mocks/dataset-mocks';
import {of} from 'rxjs';

describe('ReusedDataComponent', () => {
  let component: ReusedDataComponent;
  let fixture: ComponentFixture<ReusedDataComponent>;
  let backendSpy;

  beforeEach(async () => {
    backendSpy = jasmine.createSpyObj('BackendService', ['searchDataset']);
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ReusedDataComponent],
      providers: [
        {provide: BackendService, useValue: backendSpy}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusedDataComponent);
    component = fixture.componentInstance;
    component.specifyDataStep = new UntypedFormGroup({
      reusedKind: new UntypedFormControl(undefined)
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

    expect(backendSpy.searchDataset).toHaveBeenCalledOnceWith('doi:10.12345/12345');
    expect(component.datasetToAdd.emit).toHaveBeenCalledOnceWith(restrictedDatasetMock);
  });
});
