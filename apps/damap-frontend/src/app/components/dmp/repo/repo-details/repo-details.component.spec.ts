import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RepoDetailsComponent} from './repo-details.component';
import {mockDetailRepo} from '../../../../mocks/repository-mocks';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';

describe('RepoRecommendationComponent', () => {
  let component: RepoDetailsComponent;
  let fixture: ComponentFixture<RepoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [RepoDetailsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoDetailsComponent);
    component = fixture.componentInstance;
    component.repo = mockDetailRepo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
