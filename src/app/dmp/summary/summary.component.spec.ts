import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SummaryComponent} from './summary.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {provideMockStore} from '@ngrx/store/testing';
import {selectForm} from '../../store/selectors/form.selectors';
import {completeDmp} from '../../mocks/dmp-mocks';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';

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
        initialState, selectors: [{
          selector: selectForm, value: completeDmp
        }]
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

  it('should produce a complete summary', () => {
    for (const item of component.dataSource) {
      expect(item.completeness).toBeGreaterThanOrEqual(100);
    }
  });
});
