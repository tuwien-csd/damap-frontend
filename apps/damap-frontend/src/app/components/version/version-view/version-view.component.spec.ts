import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VersionViewComponent} from './version-view.component';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {BackendService} from '../../../services/backend.service';

describe('VersionViewComponent', () => {
  let component: VersionViewComponent;
  let fixture: ComponentFixture<VersionViewComponent>;
  let backendSpy;

  beforeEach(async () => {
    backendSpy = jasmine.createSpyObj('BackendService', ['getDmpByIdAndRevision', 'getDmpVersions']);
    await TestBed.configureTestingModule({
      declarations: [VersionViewComponent],
      imports: [RouterTestingModule, TranslateTestingModule],
      providers: [
        {provide: BackendService, useValue: backendSpy}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
