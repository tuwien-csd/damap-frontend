import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportWarningDialogComponent } from './export-warning-dialog.component';
import {TranslateTestingModule} from "@damap/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

describe('ExportWarningDialogComponent', () => {
  let component: ExportWarningDialogComponent;
  let fixture: ComponentFixture<ExportWarningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportWarningDialogComponent, TranslateTestingModule, MatDialogModule, MatButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
