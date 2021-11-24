import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthicalAspectsComponent } from './ethical-aspects.component';

describe('EthicalAspectsComponent', () => {
  let component: EthicalAspectsComponent;
  let fixture: ComponentFixture<EthicalAspectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EthicalAspectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EthicalAspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
