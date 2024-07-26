import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  selectInternalStorages,
  selectInternalStoragesLoaded,
} from '../../../../store/selectors/internal-storage.selectors';

import { LoadingState } from '../../../../domain/enum/loading-state.enum';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StorageComponent } from './storage.component';
import { StorageFilterPipe } from './storage-filter.pipe';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { mockInternalStorage } from '../../../../mocks/storage-mocks';
import { provideMockStore } from '@ngrx/store/testing';

describe('StorageComponent', () => {
  let component: StorageComponent;
  let fixture: ComponentFixture<StorageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StorageComponent, StorageFilterPipe],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectInternalStoragesLoaded,
              value: LoadingState.LOADED,
            },
            { selector: selectInternalStorages, value: [mockInternalStorage] },
          ],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
