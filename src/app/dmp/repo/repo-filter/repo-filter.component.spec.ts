import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoFilterComponent } from './repo-filter.component';

describe('RepoFilterComponent', () => {
  let component: RepoFilterComponent;
  let fixture: ComponentFixture<RepoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
