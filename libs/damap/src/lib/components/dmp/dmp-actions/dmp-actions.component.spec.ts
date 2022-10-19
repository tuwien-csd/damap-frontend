import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DmpActionsComponent, SaveVersionDialogComponent} from './dmp-actions.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';
import {FormTestingModule} from '../../../testing/form-testing/form-testing.module';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Subject} from 'rxjs';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatDialogHarness} from '@angular/material/dialog/testing';
import {MatInputHarness} from '@angular/material/input/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {FormsModule} from '@angular/forms';
import {ExportWarningDialogComponent} from "../../../widgets/export-warning-dialog/export-warning-dialog.component";

describe('DmpActionsComponent', () => {
  let component: DmpActionsComponent;
  let fixture: ComponentFixture<DmpActionsComponent>;
  let loader: HarnessLoader;
  let store: MockStore;
  const initialState = {
    damap: {
      form: {dmp: null, changed: false},
      dmps: {saving: false}
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ExportWarningDialogComponent,
        MatButtonModule, MatDialogModule,
        FormsModule,
        NoopAnimationsModule,
        TranslateTestingModule,
        FormTestingModule
      ],
      declarations: [DmpActionsComponent, SaveVersionDialogComponent],
      providers: [
        provideMockStore({initialState})
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmpActionsComponent);
    component = fixture.componentInstance;
    component.stepChanged$ = new Subject<any>();
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save dmp on step and form change', async () => {
    spyOn(component, 'saveDmp').and.callThrough();
    spyOn(store, 'dispatch');

    component.stepChanged$.next(null);

    expect(component.saveDmp).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(0);

    component.formChanged = true;
    component.stepChanged$.next(null);

    expect(component.saveDmp).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch save dmp version action', async () => {
    spyOn(store, 'dispatch');

    let dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(0);

    component.saveDmpVersion();
    dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);

    const inputs = await loader.getAllHarnesses(MatInputHarness);
    expect(inputs.length).toBe(1);

    await inputs[0].setValue('test');
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(6);
    expect(await buttons[5].getText()).toBe('dmp.dialog.button.save');
    expect(await buttons[5].isDisabled()).toBe(false);

    await buttons[5].click();
    dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(dialogs.length).toBe(0);
  });

  it('should dispatch export dmp action', async () => {
    spyOn(store, 'dispatch');
    component.exportDmp();

    let dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);
    await dialogs[0].close();

    dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(0);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
