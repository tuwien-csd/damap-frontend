import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalEthicalAspectsComponent } from './legal-ethical-aspects.component';

describe('LegalEthicalAspectsComponent', () => {
  let component: LegalEthicalAspectsComponent;
  let fixture: ComponentFixture<LegalEthicalAspectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalEthicalAspectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalEthicalAspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
