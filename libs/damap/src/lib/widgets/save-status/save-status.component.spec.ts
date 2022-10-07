import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SaveStatusComponent} from './save-status.component';
import {MatIconModule} from '@angular/material/icon';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';

describe('SaveStatusComponent', () => {
  let component: SaveStatusComponent;
  let fixture: ComponentFixture<SaveStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, TranslateTestingModule],
      declarations: [SaveStatusComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
