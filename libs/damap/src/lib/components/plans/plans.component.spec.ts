import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

import {AuthService} from '../../auth/auth.service';
import {BackendService} from '../../services/backend.service';
import {DeleteWarningDialogComponent} from "../../widgets/delete-warning-dialog/delete-warning-dialog.component";
import {HarnessLoader} from "@angular/cdk/testing";
import {MatButtonHarness} from "@angular/material/button/testing";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogHarness} from "@angular/material/dialog/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {PlansComponent} from './plans.component';
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';
import {mockDmpList} from "../../mocks/dmp-list-mocks";
import {of} from "rxjs";

describe('PlanComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;
  let loader: HarnessLoader;
  let authSpy;
  let backendSpy;
  let store: MockStore;
  const initialState = {damap: {dmps: {loaded: true, entities: mockDmpList, ids: [1]}}};

  beforeEach(waitForAsync(async () => {
    backendSpy = jasmine.createSpyObj('BackendService', ['getDmpDocument', 'getMaDmpJsonFile', 'getAllDmps', 'deleteDmp', 'exportDmpTemplate']);
    backendSpy.getAllDmps.and.returnValue(of(mockDmpList));
    authSpy = jasmine.createSpyObj('AuthService', ['hasValidAccessToken', 'isAdmin']);
    await TestBed.configureTestingModule({
      imports: [MatIconModule, MatProgressBarModule, MatDialogModule, MatButtonModule,
        TranslateTestingModule, DeleteWarningDialogComponent,
        NoopAnimationsModule],
      declarations: [PlansComponent],
      providers: [
        provideMockStore({initialState}),
        {provide: BackendService, useValue: backendSpy},
        {provide: AuthService, useValue: authSpy}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(PlansComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove dmps', async () => {
    spyOn(store, 'dispatch');
    authSpy.isAdmin.and.returnValue(true);
    backendSpy.deleteDmp.and.returnValue(of({status: 204}));

    component.deleteDmp(1);
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);

    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    await buttons[2].click();

    expect(backendSpy.deleteDmp).toHaveBeenCalledWith(1);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
