import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DmpTableComponent} from './dmp-table.component';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';

describe('DmpTableComponent', () => {
  let component: DmpTableComponent;
  let fixture: ComponentFixture<DmpTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatIconModule, TranslateTestingModule],
      declarations: [DmpTableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
