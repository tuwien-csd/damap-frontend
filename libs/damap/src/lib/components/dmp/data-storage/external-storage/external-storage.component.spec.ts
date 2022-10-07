import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExternalStorageComponent} from './external-storage.component';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';

describe('ExternalStorageComponent', () => {
  let component: ExternalStorageComponent;
  let fixture: ComponentFixture<ExternalStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [ExternalStorageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
