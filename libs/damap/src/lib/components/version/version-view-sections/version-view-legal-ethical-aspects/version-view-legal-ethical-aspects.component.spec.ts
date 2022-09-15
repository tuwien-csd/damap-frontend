import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VersionViewLegalEthicalAspectsComponent} from './version-view-legal-ethical-aspects.component';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';

describe('VersionViewLegalEthicalAspectsComponent', () => {
  let component: VersionViewLegalEthicalAspectsComponent;
  let fixture: ComponentFixture<VersionViewLegalEthicalAspectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VersionViewLegalEthicalAspectsComponent],
      imports: [TranslateTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewLegalEthicalAspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
