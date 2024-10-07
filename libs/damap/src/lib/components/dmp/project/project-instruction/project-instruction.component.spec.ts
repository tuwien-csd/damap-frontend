import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProjectInstructionComponent } from './project-instruction.component';

describe('ProjectInstructionComponent', () => {
  let component: ProjectInstructionComponent;
  let fixture: ComponentFixture<ProjectInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectInstructionComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default selectedView as "primaryView"', () => {
    expect(component.selectedView).toBe('primaryView');
  });

  it('should emit "primaryView" on ngOnInit', () => {
    spyOn(component.selectionChange, 'emit');
    component.ngOnInit();
    expect(component.selectionChange.emit).toHaveBeenCalledWith('primaryView');
  });

  it('should emit the correct view when emitSelection is called', () => {
    spyOn(component.selectionChange, 'emit');
    component.emitSelection('secondaryView');
    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      'secondaryView',
    );
  });

  it('should change selectedView when onViewChange is called', () => {
    component.onViewChange('secondaryView');
    expect(component.selectedView).toBe('secondaryView');
  });

  it('should set selectedView to "primaryView" by default in ngOnInit', () => {
    component.ngOnInit();
    expect(component.selectedView).toBe('primaryView');
  });
});
