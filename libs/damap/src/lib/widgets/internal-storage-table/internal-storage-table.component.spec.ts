import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalStorageTableComponent } from './internal-storage-table.component';

describe('InternalStorageTableComponent', () => {
  let component: InternalStorageTableComponent;
  let fixture: ComponentFixture<InternalStorageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalStorageTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InternalStorageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
