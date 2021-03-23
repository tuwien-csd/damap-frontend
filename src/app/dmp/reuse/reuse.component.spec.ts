import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuseComponent } from './reuse.component';

describe('ReuseComponent', () => {
  let component: ReuseComponent;
  let fixture: ComponentFixture<ReuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReuseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
