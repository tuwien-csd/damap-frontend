import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataMcComponent} from './data-mc.component';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';

describe('DataMcComponent', () => {
  let component: DataMcComponent;
  let fixture: ComponentFixture<DataMcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [DataMcComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
