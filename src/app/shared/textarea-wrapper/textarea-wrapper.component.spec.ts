import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaWrapperComponent } from './textarea-wrapper.component';

describe('TextareaWrapperComponent', () => {
  let component: TextareaWrapperComponent;
  let fixture: ComponentFixture<TextareaWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
