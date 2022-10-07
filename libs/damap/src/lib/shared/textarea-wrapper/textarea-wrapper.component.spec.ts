import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TextareaWrapperComponent} from './textarea-wrapper.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';

describe('TextareaWrapperComponent', () => {
  let component: TextareaWrapperComponent;
  let fixture: ComponentFixture<TextareaWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, NoopAnimationsModule, TranslateTestingModule],
      declarations: [TextareaWrapperComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaWrapperComponent);
    component = fixture.componentInstance;
    component.label = 'Label';
    component.control = new UntypedFormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
