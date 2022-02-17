import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TreeSelectFormFieldComponent} from './tree-select-form-field.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatTreeModule} from '@angular/material/tree';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatOptionModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputHarness} from '@angular/material/input/testing';

describe('TreeSelectFormFieldComponent', () => {
  let component: TreeSelectFormFieldComponent;
  let fixture: ComponentFixture<TreeSelectFormFieldComponent>;
  let loader: HarnessLoader;
  let input: MatInputHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule, MatChipsModule, MatInputModule, MatAutocompleteModule, MatOptionModule, MatTreeModule,
        MatButtonModule, MatCheckboxModule, MatIconModule, TranslateTestingModule, NoopAnimationsModule],
      declarations: [TreeSelectFormFieldComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TreeSelectFormFieldComponent);
    component = fixture.componentInstance;
    component.label = 'Filter';
    component.treeData = [{id: 'Tree', label: 'Tree'}];
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain input field', async () => {
    input = await loader.getHarness(MatInputHarness);
    expect(input).toBeTruthy();
  });
});
