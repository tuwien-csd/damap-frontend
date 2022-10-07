import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcidComponent } from './orcid.component';

describe('OrcidComponent', () => {
  let component: OrcidComponent;
  let fixture: ComponentFixture<OrcidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrcidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
