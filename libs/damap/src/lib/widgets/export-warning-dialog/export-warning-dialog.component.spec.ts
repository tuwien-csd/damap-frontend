import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ExportWarningDialogComponent } from './export-warning-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from '@damap/core';
import { provideMockStore } from '@ngrx/store/testing';

describe('ExportWarningDialogComponent', () => {
  let component: ExportWarningDialogComponent;
  let fixture: ComponentFixture<ExportWarningDialogComponent>;
  const fakeMatDialogRef = jasmine.createSpyObj(['close']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      declarations: [ExportWarningDialogComponent],
      providers: [
        provideMockStore(),
        { provide: MatDialogRef, useValue: fakeMatDialogRef },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(ExportWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
