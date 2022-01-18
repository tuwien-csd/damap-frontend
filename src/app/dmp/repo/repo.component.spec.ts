import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RepoComponent} from './repo.component';
import {StepIntroComponent} from '../../widgets/intro/step-intro.component';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';

describe('RepoComponent', () => {
  let component: RepoComponent;
  let fixture: ComponentFixture<RepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
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
