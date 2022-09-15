import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RepoRecommendationComponent} from './repo-recommendation.component';
import {RepoPipe} from '../repo.pipe';
import {mockDetailRepo} from '../../../../mocks/repository-mocks';

describe('RepoRecommendationComponent', () => {
  let component: RepoRecommendationComponent;
  let fixture: ComponentFixture<RepoRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepoRecommendationComponent, RepoPipe]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoRecommendationComponent);
    component = fixture.componentInstance;
    component.recommended = [mockDetailRepo];
    component.selectedRepos = [{id: -1, repositoryId: 'r3d', title: 'MockHost'}]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
