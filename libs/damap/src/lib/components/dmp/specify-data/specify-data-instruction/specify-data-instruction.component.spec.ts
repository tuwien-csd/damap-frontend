import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SpecifyDataInstructionComponent } from './specify-data-instruction.component';

describe('SpecifyDataInstructionComponent', () => {
  let component: SpecifyDataInstructionComponent;
  let fixture: ComponentFixture<SpecifyDataInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecifyDataInstructionComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecifyDataInstructionComponent);
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
