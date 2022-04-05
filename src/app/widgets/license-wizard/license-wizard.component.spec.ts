import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LicenseSelectorDialogComponent, LicenseWizardComponent} from './license-wizard.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatDialogHarness} from '@angular/material/dialog/testing';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';
import {LicenseFilterPipe} from './license-filter.pipe';

describe('LicenseWizardComponent', () => {
  let component: LicenseWizardComponent;
  let fixture: ComponentFixture<LicenseWizardComponent>;
  let loader: HarnessLoader;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, NoopAnimationsModule, TranslateTestingModule],
      declarations: [LicenseWizardComponent, LicenseSelectorDialogComponent, LicenseFilterPipe]
    }).compileComponents();
    fixture = TestBed.createComponent(LicenseWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load harness for dialog, open and close dialog', async () => {
    fixture.componentInstance.openDialog();
    let dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);
    await dialogs[0].close();
    dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(0);
  });
});
