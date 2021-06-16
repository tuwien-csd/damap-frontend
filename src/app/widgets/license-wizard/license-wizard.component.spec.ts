import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseWizardComponent } from './license-wizard.component';

describe('LicenseWizardComponent', () => {
  let component: LicenseWizardComponent;
  let fixture: ComponentFixture<LicenseWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseWizardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
