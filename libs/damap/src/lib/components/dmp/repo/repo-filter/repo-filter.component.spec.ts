import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterDialogComponent, RepoFilterComponent} from './repo-filter.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';
import {MatDialogModule} from "@angular/material/dialog";

describe('RepoFilterComponent', () => {
  let component: RepoFilterComponent;
  let fixture: ComponentFixture<RepoFilterComponent>;
  let store: MockStore;
  const initialState = {filters: null};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, TranslateTestingModule],
      declarations: [RepoFilterComponent, FilterDialogComponent],
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
