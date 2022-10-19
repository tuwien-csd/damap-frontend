import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlansComponent} from './plans.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {BackendService} from '../../services/backend.service';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';
import {AuthService} from '../../auth/auth.service';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from "@angular/material/dialog";

describe('PlanComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;
  let store: MockStore;
  const initialState = {dmps: {loaded: true}};

  beforeEach(async () => {
    const backendSpy = jasmine.createSpyObj('BackendService', ['getDmpDocument', 'getMaDmpJsonFile']);
    const authSpy = jasmine.createSpyObj('AuthService', ['hasValidAccessToken', 'isAdmin']);
    await TestBed.configureTestingModule({
      imports: [MatIconModule, MatProgressBarModule, MatDialogModule, TranslateTestingModule],
      declarations: [PlansComponent],
      providers: [
        provideMockStore({initialState}),
        {provide: BackendService, useValue: backendSpy},
        {provide: AuthService, useValue: authSpy}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
