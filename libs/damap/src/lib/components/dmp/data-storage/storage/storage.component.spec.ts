import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StorageComponent} from './storage.component';
import {StorageFilterPipe} from './storage-filter.pipe';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';
import {provideMockStore} from '@ngrx/store/testing';
import {LoadingState} from '../../../../domain/enum/loading-state.enum';
import {
  selectInternalStorages,
  selectInternalStoragesLoaded
} from '../../../../store/selectors/internal-storage.selectors';
import {mockInternalStorage} from '../../../../mocks/storage-mocks';

describe('StorageComponent', () => {
  let component: StorageComponent;
  let fixture: ComponentFixture<StorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [StorageComponent, StorageFilterPipe],
      providers: [
        provideMockStore({
          selectors: [
            {selector: selectInternalStoragesLoaded, value: LoadingState.LOADED},
            {selector: selectInternalStorages, value: [mockInternalStorage]}
          ]
        }),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
