import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContributorManualComponent} from './contributor-manual.component';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';
import {UntypedFormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {IdentifierType} from '../../../../domain/enum/identifier-type.enum';

describe('ContributorManualComponent', () => {
  let component: ContributorManualComponent;
  let fixture: ComponentFixture<ContributorManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, MatIconModule, MatCardModule, ReactiveFormsModule, TranslateTestingModule],
      declarations: [ContributorManualComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have orcid set after form reset', () => {
    component.form.setValue({
      firstName: 'abc', lastName: 'def', mbox: 'john.doe@email.com', personId: {
        type: IdentifierType.ORCID, identifier: '1234'
      }
    });
    component.resetForm();
    expect((component.form.controls.personId as UntypedFormGroup).controls.type.value).toBe(IdentifierType.ORCID);
  })
});
