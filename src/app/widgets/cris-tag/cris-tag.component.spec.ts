import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrisTagComponent } from './cris-tag.component';

describe('CrisTagComponent', () => {
  let component: CrisTagComponent;
  let fixture: ComponentFixture<CrisTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrisTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrisTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
