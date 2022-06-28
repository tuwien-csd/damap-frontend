import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreatedDataComponent} from './created-data.component';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';
import {FormControl, FormGroup} from '@angular/forms';

describe('CreatedDataComponent', () => {
  let component: CreatedDataComponent;
  let fixture: ComponentFixture<CreatedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [CreatedDataComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedDataComponent);
    component = fixture.componentInstance;
    component.specifyDataStep = new FormGroup({
      kind: new FormControl(undefined),
      explanation: new FormControl('')
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
