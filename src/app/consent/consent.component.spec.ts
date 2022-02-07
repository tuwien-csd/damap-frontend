import { ComponentFixture, TestBed } from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from '../testing/translate-testing/translate-testing.module';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConsentComponent } from './consent.component';

describe('ConsentComponent', () => {
  let component: ConsentComponent;
  let fixture: ComponentFixture<ConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogRef, MatDialog, MatDialogModule, NoopAnimationsModule, TranslateTestingModule],
      providers: [ MatDialogRef ],
      declarations: [ ConsentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
