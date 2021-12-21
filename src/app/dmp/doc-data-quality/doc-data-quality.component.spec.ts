import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocDataQualityComponent} from './doc-data-quality.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {StepIntroComponent} from '../../widgets/intro/step-intro.component';
import {TextareaWrapperComponent} from '../../shared/textarea-wrapper/textarea-wrapper.component';

describe('DocDataQualityComponent', () => {
  let component: DocDataQualityComponent;
  let fixture: ComponentFixture<DocDataQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatAutocompleteModule],
      declarations: [DocDataQualityComponent, StepIntroComponent, TextareaWrapperComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDataQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
