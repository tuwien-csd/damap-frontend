import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VersionViewDocDataQualityComponent} from './version-view-doc-data-quality.component';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';

describe('VersionViewDocDataQualityComponent', () => {
  let component: VersionViewDocDataQualityComponent;
  let fixture: ComponentFixture<VersionViewDocDataQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VersionViewDocDataQualityComponent],
      imports: [TranslateTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewDocDataQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
