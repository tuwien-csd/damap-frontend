import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreatedDataComponent} from './created-data.component';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {DataKind} from '../../../../domain/enum/data-kind.enum';

describe('CreatedDataComponent', () => {
  let component: CreatedDataComponent;
  let fixture: ComponentFixture<CreatedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [CreatedDataComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedDataComponent);
    component = fixture.componentInstance;
    component.specifyDataStep = new UntypedFormGroup({
      kind: new UntypedFormControl(DataKind.NONE),
      explanation: new UntypedFormControl('')
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
