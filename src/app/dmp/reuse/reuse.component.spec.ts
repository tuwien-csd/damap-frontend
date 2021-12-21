import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReuseComponent} from './reuse.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {StepIntroComponent} from '../../widgets/intro/step-intro.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ReuseComponent', () => {
  let component: ReuseComponent;
  let fixture: ComponentFixture<ReuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatAutocompleteModule, MatInputModule, MatFormFieldModule, NoopAnimationsModule],
      declarations: [ReuseComponent, StepIntroComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
