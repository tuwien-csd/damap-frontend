import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionViewStoragesComponent } from './version-view-storages.component';

describe('VersionViewStoragesComponent', () => {
  let component: VersionViewStoragesComponent;
  let fixture: ComponentFixture<VersionViewStoragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionViewStoragesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewStoragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
