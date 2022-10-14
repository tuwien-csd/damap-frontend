import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VersionViewCostsComponent} from './version-view-costs.component';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';

describe('VersionViewCostsComponent', () => {
  let component: VersionViewCostsComponent;
  let fixture: ComponentFixture<VersionViewCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VersionViewCostsComponent],
      imports: [TranslateTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
