import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VersionListComponent} from './version-list.component';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {BackendService} from '../../../services/backend.service';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {selectDmpById} from '../../../store/selectors/dmp.selectors';
import {completeDmp} from '../../../mocks/dmp-mocks';
import {AuthService} from "../../../auth/auth.service";

describe('VersionListComponent', () => {
  let component: VersionListComponent;
  let fixture: ComponentFixture<VersionListComponent>;
  let backendSpy;
  let store: MockStore;
  const initialState = {
    dmps: {entities: {1: completeDmp}}
  };
  const authSpy = jasmine.createSpyObj('AuthService', ['isAdmin']);

  beforeEach(async () => {
    authSpy.isAdmin.and.returnValue(false);
    backendSpy = jasmine.createSpyObj('BackendService', ['getDmpVersions']);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateTestingModule],
      declarations: [VersionListComponent],
      providers: [
        {provide: AuthService, useValue: authSpy},
        {provide: BackendService, useValue: backendSpy},
        provideMockStore({
          initialState,
          selectors: [
            {selector: selectDmpById({id: 1}), value: completeDmp}
          ]
        }),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
