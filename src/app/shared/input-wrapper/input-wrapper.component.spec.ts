import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InputWrapperComponent} from './input-wrapper.component';

describe('InputFormFieldWrapperComponent', () => {
  let component: InputWrapperComponent;
  let fixture: ComponentFixture<InputWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
