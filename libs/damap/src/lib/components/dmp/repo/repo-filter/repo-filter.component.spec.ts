import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RepoFilterComponent} from './repo-filter.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';

describe('RepoFilterComponent', () => {
  let component: RepoFilterComponent;
  let fixture: ComponentFixture<RepoFilterComponent>;
  let store: MockStore;
  const initialState = {filters: null};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [RepoFilterComponent],
      providers: [
        provideMockStore({initialState})
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoFilterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
