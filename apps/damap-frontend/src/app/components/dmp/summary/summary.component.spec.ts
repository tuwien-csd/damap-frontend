import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SummaryComponent} from './summary.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {provideMockStore} from '@ngrx/store/testing';
import {selectForm, selectFormContact} from '../../../store/selectors/form.selectors';
import {completeDmp} from '../../../mocks/dmp-mocks';
import {mockContact} from '../../../mocks/contributor-mocks';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  const initialState = {
    form: {dmp: null, changed: false}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatProgressBarModule, TranslateTestingModule],
      declarations: [SummaryComponent],
      providers: [provideMockStore({
        initialState, selectors: [
          {selector: selectForm, value: completeDmp},
          {selector: selectFormContact, value: mockContact}
        ]
      })]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
