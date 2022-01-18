import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TreeSelectFormFieldComponent} from './tree-select-form-field.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatTreeModule} from '@angular/material/tree';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';
import {MatChipsModule} from '@angular/material/chips';

describe('TreeSelectFormFieldComponent', () => {
  let component: TreeSelectFormFieldComponent;
  let fixture: ComponentFixture<TreeSelectFormFieldComponent>;
  let loader: HarnessLoader;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatChipsModule, MatTreeModule, TranslateTestingModule],
      declarations: [TreeSelectFormFieldComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TreeSelectFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);

    input = fixture.nativeElement.querySelector('input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain input field', () => {
    expect(input).toBeTruthy();
  });

  it('should show tree select when focusing on input', () => {
    expect(input).toBeTruthy();
    input.focus();
    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    const treeSelect = fixture.nativeElement.querySelector('mat-tree');
    expect(treeSelect).toBeTruthy();
  })
});
