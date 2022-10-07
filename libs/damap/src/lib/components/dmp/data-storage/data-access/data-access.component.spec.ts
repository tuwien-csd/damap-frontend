import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataAccessComponent} from './data-access.component';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('DataAccessComponent', () => {
  let component: DataAccessComponent;
  let fixture: ComponentFixture<DataAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatExpansionModule, NoopAnimationsModule, TranslateTestingModule],
      declarations: [DataAccessComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
