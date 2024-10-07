import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PeopleInstructionComponent } from './people-instruction.component';

describe('PeopleInstructionComponent', () => {
  let component: PeopleInstructionComponent;
  let fixture: ComponentFixture<PeopleInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleInstructionComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default selectedView as "primaryView"', () => {
    expect(component.selectedView).toBe('primaryView');
  });

  it('should change selectedView and emit selectionChange when onSelectionChange is called', () => {
    spyOn(component.selectionChange, 'emit');
    component.onSelectionChange('secondaryView');
    expect(component.selectedView).toBe('secondaryView');
    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      'secondaryView',
    );
  });

  it('should emit "primaryView" when onSelectionChange is called with "primaryView"', () => {
    spyOn(component.selectionChange, 'emit');
    component.onSelectionChange('primaryView');
    expect(component.selectedView).toBe('primaryView');
    expect(component.selectionChange.emit).toHaveBeenCalledWith('primaryView');
  });
});
