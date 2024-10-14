import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFieldComponent } from './search-field.component';
import { SharedModule } from '../shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchFieldComponent', () => {
  let component: SearchFieldComponent;
  let fixture: ComponentFixture<SearchFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        MatFormFieldModule,
        TranslateTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      declarations: [SearchFieldComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFieldComponent);
    component = fixture.componentInstance;
    component.control = new UntypedFormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchChange on input', () => {
    spyOn(component.searchChange, 'emit');

    const testValue = 'test search';
    component.control.setValue(testValue);

    component.onSearchChange(testValue);

    expect(component.searchChange.emit).toHaveBeenCalledWith(testValue);
  });
});
