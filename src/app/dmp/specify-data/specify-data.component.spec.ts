import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifyDataComponent } from './specify-data.component';

describe('SpecifyDataComponent', () => {
  let component: SpecifyDataComponent;
  let fixture: ComponentFixture<SpecifyDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecifyDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
