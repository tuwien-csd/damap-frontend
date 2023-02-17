import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdprComponent } from './gdpr.component';

describe('GdprComponent', () => {
  let component: GdprComponent;
  let fixture: ComponentFixture<GdprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdprComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GdprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
