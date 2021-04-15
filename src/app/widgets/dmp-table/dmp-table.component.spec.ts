import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmpTableComponent } from './dmp-table.component';

describe('DmpTableComponent', () => {
  let component: DmpTableComponent;
  let fixture: ComponentFixture<DmpTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmpTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
