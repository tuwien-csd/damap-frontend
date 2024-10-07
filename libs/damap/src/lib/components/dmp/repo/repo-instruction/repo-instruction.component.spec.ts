import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RepoInstructionComponent } from './repo-instruction.component';

describe('RepoInstructionComponent', () => {
  let component: RepoInstructionComponent;
  let fixture: ComponentFixture<RepoInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepoInstructionComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default as primary view', () => {
    expect(component.selectedView).toBe('primaryView');
  });

  it('should change selectedView and emit selectionChange ', () => {
    spyOn(component.selectionChange, 'emit');
    component.onSelectionChange('secondaryView');
    expect(component.selectedView).toBe('secondaryView');
    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      'secondaryView',
    );
  });

  it('should emit "primaryView" when onSelectionChange with primary view"', () => {
    spyOn(component.selectionChange, 'emit');
    component.onSelectionChange('primaryView');
    expect(component.selectedView).toBe('primaryView');
    expect(component.selectionChange.emit).toHaveBeenCalledWith('primaryView');
  });
});
