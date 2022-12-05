import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpecifyDataComponent} from './specify-data.component';
import {UntypedFormArray, UntypedFormControl, UntypedFormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {StepIntroComponent} from '../../../widgets/step-intro/step-intro.component';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';
import {MatTabsModule} from '@angular/material/tabs';
import {closedDatasetMock, restrictedDatasetMock} from '../../../mocks/dataset-mocks';

describe('SpecifyDataComponent', () => {
  let component: SpecifyDataComponent;
  let fixture: ComponentFixture<SpecifyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatTabsModule, MatRadioModule, TranslateTestingModule],
      declarations: [SpecifyDataComponent, StepIntroComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifyDataComponent);
    component = fixture.componentInstance;
    component.specifyDataStep = new UntypedFormGroup({
      kind: new UntypedFormControl(null),
      explanation: new UntypedFormControl('')
    });
    component.datasets = new UntypedFormArray([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Test AbstractBaseDataComponent */
  it('should test abstract components functionality', () => {
    spyOn(component.datasetToAdd, 'emit');
    spyOn(component.updateDataset, 'emit');
    spyOn(component.removeDataset, 'emit');

    // Test add dataset
    component.add(closedDatasetMock);
    expect(component.datasetToAdd.emit).toHaveBeenCalledOnceWith(closedDatasetMock);
    // Test update dataset
    component.update({index: 0, update: restrictedDatasetMock});
    expect(component.updateDataset.emit).toHaveBeenCalledOnceWith({index: 0, update: restrictedDatasetMock});
    // Test remove dataset
    component.remove(0);
    expect(component.removeDataset.emit).toHaveBeenCalledOnceWith(0);
  });

  it('should emit file to analyse', () => {
    spyOn(component.fileToAnalyse, 'emit');
    const file = new File([], 'test.txt');
    component.analyseFile(file);
    expect(component.fileToAnalyse.emit).toHaveBeenCalledOnceWith(file);
  });

  it('should cancel file upload', () => {
    spyOn(component.uploadToCancel, 'emit');
    component.cancelUpload(0);
    expect(component.uploadToCancel.emit).toHaveBeenCalledOnceWith(0);
  });
});
