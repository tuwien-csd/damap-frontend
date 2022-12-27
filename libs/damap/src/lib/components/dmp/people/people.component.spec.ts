import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule, UntypedFormArray, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {mockContact, mockContributor1} from '../../../mocks/contributor-mocks';

import {BackendService} from '../../../services/backend.service';
import {ContributorFilterPipe} from './contributor-filter.pipe';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PeopleComponent} from './people.component';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';
import { of } from 'rxjs';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let backendSpy;

  beforeEach(async () => {
    backendSpy = jasmine.createSpyObj('BackendService', ['loadServiceConfig']);
    backendSpy.loadServiceConfig.and.returnValue(of({}));
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule, MatCardModule, MatIconModule, MatDialogModule, ReactiveFormsModule, MatSelectModule, NoopAnimationsModule],
      declarations: [PeopleComponent, ContributorFilterPipe],
      providers: [{provide: BackendService, useValue: backendSpy}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    component.dmpForm = new UntypedFormGroup({
      datasets: new UntypedFormArray([]),
      contributors: new UntypedFormArray([
        new UntypedFormGroup({
          role: new UntypedFormControl(undefined)
        })
      ])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should emit contact', () => {
    spyOn(component.contactPerson, 'emit');

    component.changeContactPerson(mockContact);
    expect(component.contactPerson.emit).toHaveBeenCalledOnceWith(mockContact);
  });

  it('should emit contributor to add', () => {
    spyOn(component.contributorToAdd, 'emit');

    component.addContributor(mockContributor1);
    expect(component.contributorToAdd.emit).toHaveBeenCalledOnceWith(mockContributor1);
  });

  it('should remove contributor from dataset and emit change', () => {
    spyOn(component.contributorToRemove, 'emit');

    component.removeContributor(0);
    expect(component.contributorToRemove.emit).toHaveBeenCalledOnceWith(0);
  });
});
