import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionViewContributorsComponent } from './version-view-contributors.component';

describe('VersionViewContributorsComponent', () => {
  let component: VersionViewContributorsComponent;
  let fixture: ComponentFixture<VersionViewContributorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionViewContributorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewContributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
