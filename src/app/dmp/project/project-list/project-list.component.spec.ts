import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectListComponent} from './project-list.component';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [ProjectListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
