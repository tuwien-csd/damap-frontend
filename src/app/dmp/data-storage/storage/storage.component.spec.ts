import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StorageComponent} from './storage.component';
import {StorageFilterPipe} from './storage-filter.pipe';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';

describe('StorageComponent', () => {
  let component: StorageComponent;
  let fixture: ComponentFixture<StorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [StorageComponent, StorageFilterPipe]
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
