import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RepoComponent} from './repo.component';
import {StepIntroComponent} from '../../widgets/intro/step-intro.component';

describe('RepoComponent', () => {
  let component: RepoComponent;
  let fixture: ComponentFixture<RepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepoComponent, StepIntroComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
