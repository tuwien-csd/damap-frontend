import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ExportWarningDialogComponent } from './export-warning-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { MatSelectModule } from '@angular/material/select';
import {TranslateTestingModule} from "@damap/core";

describe('ExportWarningDialogComponent', () => {
  let component: ExportWarningDialogComponent;
  let fixture: ComponentFixture<ExportWarningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportWarningDialogComponent, MatSelectModule, TranslateTestingModule, MatDialogModule, MatButtonModule],
      declarations: [ ExportWarningDialogComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExportWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
