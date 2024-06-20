import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BackendService } from '../../../services/backend.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';
import { VersionViewComponent } from './version-view.component';

describe('VersionViewComponent', () => {
  let component: VersionViewComponent;
  let fixture: ComponentFixture<VersionViewComponent>;
  let backendSpy;

  beforeEach(waitForAsync(() => {
    backendSpy = jasmine.createSpyObj('BackendService', [
      'getDmpByIdAndRevision',
      'getDmpVersions',
    ]);
    TestBed.configureTestingModule({
      declarations: [VersionViewComponent],
      imports: [RouterTestingModule, TranslateTestingModule],
      providers: [{ provide: BackendService, useValue: backendSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
