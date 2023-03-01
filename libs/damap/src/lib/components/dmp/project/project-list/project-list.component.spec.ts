import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatListModule } from '@angular/material/list';
import { MatSelectionListHarness } from '@angular/material/list/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BackendService } from '@damap/core';
import { of } from 'rxjs';
import { mockProject } from '../../../../mocks/project-mocks';
import { mockProjectSearchResult } from '../../../../mocks/search';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { ProjectListComponent } from './project-list.component';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let loader: HarnessLoader;
  let backendSpy
  beforeEach(async () => {
    backendSpy = jasmine.createSpyObj('BackendService', ['getProjectSearchResult']);
    backendSpy.getProjectSearchResult.and.returnValue(of(mockProjectSearchResult));

    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatListModule, NoopAnimationsModule],
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
