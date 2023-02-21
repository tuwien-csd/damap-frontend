import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdprComponent } from './gdpr.component';
import { BackendService, TranslateTestingModule } from "@damap/core";

describe('GdprComponent', () => {
  let component: GdprComponent;
  let fixture: ComponentFixture<GdprComponent>;
  let backendSpy;

  beforeEach(async () => {
    backendSpy = jasmine.createSpyObj('BackendService', ['getGdpr']);
    await TestBed.configureTestingModule({
      imports: [GdprComponent, TranslateTestingModule],
      providers: [{provide: BackendService, useValue: backendSpy}]
    }).compileComponents();

    fixture = TestBed.createComponent(GdprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
