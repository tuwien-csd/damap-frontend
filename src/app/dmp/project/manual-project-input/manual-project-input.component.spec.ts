import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManualProjectInputComponent} from './manual-project-input.component';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';

describe('ManualProjectInputComponent', () => {
  let component: ManualProjectInputComponent;
  let fixture: ComponentFixture<ManualProjectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [ManualProjectInputComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualProjectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
