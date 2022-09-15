import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectListComponent} from './project-list.component';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';
import {mockProject} from '../../../../mocks/project-mocks';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ProjectFilterPipe} from '../project-filter.pipe';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectionListHarness} from '@angular/material/list/testing';
import {MatListModule} from '@angular/material/list';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule, MatFormFieldModule, MatInputModule, MatListModule, NoopAnimationsModule],
      declarations: [ProjectListComponent, ProjectFilterPipe]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change project on selection', async () => {
    spyOn(component.projectToSet, 'emit');
    component.projects = [mockProject];

    const list = await loader.getHarness(MatSelectionListHarness);
    const options = await list.getItems();

    expect(options.length).toBe(1);

    await options[0].select();
    expect(component.projectToSet.emit).toHaveBeenCalled();

  });
});
