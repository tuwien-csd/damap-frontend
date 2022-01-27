import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorManualComponent } from './contributor-manual.component';

describe('ContributorManualComponent', () => {
  let component: ContributorManualComponent;
  let fixture: ComponentFixture<ContributorManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributorManualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
