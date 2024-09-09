import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalStorageTranslationTableComponent } from './internal-storage-translation-table.component';

describe('InternalStorageTableComponent', () => {
  let component: InternalStorageTranslationTableComponent;
  let fixture: ComponentFixture<InternalStorageTranslationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalStorageTranslationTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InternalStorageTranslationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
