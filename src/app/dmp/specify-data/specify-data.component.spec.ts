import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpecifyDataComponent} from './specify-data.component';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {StepIntroComponent} from '../../widgets/step-intro/step-intro.component';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';
import {MatTabsModule} from '@angular/material/tabs';
import {closedDatasetMock, restrictedDatasetMock} from '../../mocks/dataset-mocks';

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
    component.specifyDataStep = new FormGroup({
      kind: new FormControl(null),
      explanation: new FormControl('')
    });
    component.datasets = new FormArray([]);
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
});
