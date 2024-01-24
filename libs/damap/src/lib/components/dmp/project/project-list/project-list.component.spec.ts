import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  mockProjectSearchResult,
  mockRecommendedProjectSearchResult,
} from '../../../../mocks/search';

import { BackendService } from '@damap/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectionListHarness } from '@angular/material/list/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectListComponent } from './project-list.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { mockProject } from '../../../../mocks/project-mocks';
import { of } from 'rxjs';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let loader: HarnessLoader;
  let backendSpy;

  beforeEach(async () => {
    backendSpy = jasmine.createSpyObj('BackendService', [
      'getProjectSearchResult',
      'getRecommendedProjects',
    ]);
    backendSpy.getProjectSearchResult.and.returnValue(
      of(mockProjectSearchResult)
    );
    backendSpy.getRecommendedProjects.and.returnValue(
      of(mockRecommendedProjectSearchResult)
    );

    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        NoopAnimationsModule,
      ],
      declarations: [ProjectListComponent],
      providers: [{ provide: BackendService, useValue: backendSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load projects on text input', async () => {
    const input = await loader.getHarness(MatInputHarness);

    await input.setValue(mockProject.title);
    expect(backendSpy.getProjectSearchResult).toHaveBeenCalled();
  });

  it('should change project on selection', async () => {
    spyOn(component.projectToSet, 'emit');

    const input = await loader.getHarness(MatInputHarness);
    await input.setValue(mockProject.title);

    const list = await loader.getHarness(MatSelectionListHarness);
    const options = await list.getItems();

    expect(options.length).toBe(1);
    expect(await options[0].getText()).toContain(mockProject.title);

    await options[0].select();
    expect(component.projectToSet.emit).toHaveBeenCalled();
  });
});
