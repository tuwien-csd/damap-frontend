import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMessageComponent } from './info-message.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InfoMessageComponent', () => {
  let component: InfoMessageComponent;
  let fixture: ComponentFixture<InfoMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [InfoMessageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
