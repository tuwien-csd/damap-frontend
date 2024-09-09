import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalStorageDialogComponent } from './internal-storage-dialog.component';

describe('InternalStorageDialogComponent', () => {
  let component: InternalStorageDialogComponent;
  let fixture: ComponentFixture<InternalStorageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalStorageDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InternalStorageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
