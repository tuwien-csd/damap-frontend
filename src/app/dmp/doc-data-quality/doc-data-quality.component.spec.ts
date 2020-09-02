import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDataQualityComponent } from './doc-data-quality.component';

describe('DocDataQualityComponent', () => {
  let component: DocDataQualityComponent;
  let fixture: ComponentFixture<DocDataQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocDataQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDataQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
