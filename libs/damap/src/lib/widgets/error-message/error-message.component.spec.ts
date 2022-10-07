import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorMessageComponent} from './error-message.component';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [ErrorMessageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
