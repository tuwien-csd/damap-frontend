import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedDataComponent } from './created-data.component';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DataKind } from '../../../../domain/enum/data-kind.enum';
import { MatDialogModule } from '@angular/material/dialog';
import { DatasetDialogComponent } from '../dataset-dialog/dataset-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { Config } from '../../../../domain/config';
import { configMockData } from '../../../../mocks/config-service-mocks';
import { By } from '@angular/platform-browser';
import { FileUploadComponent } from '../../../../widgets/file-upload/file-upload.component';

describe('CreatedDataComponent', () => {
  let component: CreatedDataComponent;
  let fixture: ComponentFixture<CreatedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, TranslateTestingModule],
      declarations: [CreatedDataComponent, DatasetDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedDataComponent);
    component = fixture.componentInstance;
    component.config$ = new BehaviorSubject<Config>(configMockData);
    component.specifyDataStep = new UntypedFormGroup({
      kind: new UntypedFormControl(DataKind.NONE),
      explanation: new UntypedFormControl(''),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load service config and set FITS service availability flag', () => {
      component.ngOnInit();
      expect(component.fitsServiceAvailable).toEqual(
        configMockData.fitsServiceAvailable,
      );
    });
  });

  it('file upload not available if no FITS service available', () => {
    component.fitsServiceAvailable = false;
    const element = fixture.debugElement.query(
      By.directive(FileUploadComponent),
    );
    expect(element).toBeNull();
  });

  it('file upload available if FITS service available', () => {
    component.fitsServiceAvailable = true;
    const element = fixture.debugElement.query(
      By.directive(FileUploadComponent),
    );
    expect(element).toBeDefined();
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
