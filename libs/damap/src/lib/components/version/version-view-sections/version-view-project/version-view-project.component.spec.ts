import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VersionViewProjectComponent} from './version-view-project.component';
import {mockProject} from '../../../../mocks/project-mocks';

describe('VersionViewProjectComponent', () => {
  let component: VersionViewProjectComponent;
  let fixture: ComponentFixture<VersionViewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VersionViewProjectComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewProjectComponent);
    component = fixture.componentInstance;
    component.project = mockProject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
