import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LicensesComponent} from './licenses.component';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';
import {MatCardModule} from '@angular/material/card';

describe('LicensesComponent', () => {
  let component: LicensesComponent;
  let fixture: ComponentFixture<LicensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, TranslateTestingModule],
      declarations: [LicensesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
