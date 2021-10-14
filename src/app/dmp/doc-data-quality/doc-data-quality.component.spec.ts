import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocDataQualityComponent} from './doc-data-quality.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

describe('DocDataQualityComponent', () => {
  let component: DocDataQualityComponent;
  let fixture: ComponentFixture<DocDataQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatAutocompleteModule],
      declarations: [DocDataQualityComponent]
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
