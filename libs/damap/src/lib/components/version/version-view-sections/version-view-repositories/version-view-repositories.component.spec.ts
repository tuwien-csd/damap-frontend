import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionViewRepositoriesComponent } from './version-view-repositories.component';

describe('VersionViewRepositoriesComponent', () => {
  let component: VersionViewRepositoriesComponent;
  let fixture: ComponentFixture<VersionViewRepositoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionViewRepositoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
