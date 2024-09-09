import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalStorageTranslationDialogComponent } from './internal-storage-translation-dialog.component';

describe('InternalStorageDialogComponent', () => {
  let component: InternalStorageTranslationDialogComponent;
  let fixture: ComponentFixture<InternalStorageTranslationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalStorageTranslationDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InternalStorageTranslationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
