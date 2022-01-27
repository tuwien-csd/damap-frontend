import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {notEmptyValidator} from '../../../validators/not-empty.validator';
import {IdentifierType} from '../../../domain/enum/identifier-type.enum';

@Component({
  selector: 'app-contributor-manual',
  templateUrl: './contributor-manual.component.html',
  styleUrls: ['./contributor-manual.component.css']
})
export class ContributorManualComponent {

  @Output() contactPerson = new EventEmitter<any>();
  @Output() contributorToAdd = new EventEmitter<any>();

  show = false;

  form = new FormGroup({
    firstName: new FormControl('', [notEmptyValidator(), Validators.maxLength(4000)]),
    lastName: new FormControl('', [notEmptyValidator(), Validators.maxLength(4000)]),
    personId: new FormGroup({
      type: new FormControl(IdentifierType.ORCID),
      identifier: new FormControl('', [notEmptyValidator(), Validators.maxLength(255)])
    })
  })

  constructor() { }

  changeContactPerson() {
    const contact = this.form.getRawValue();
    this.contactPerson.emit(contact);
    this.resetForm();
  }

  addContributor() {
    const contributor = this.form.getRawValue();
    this.contributorToAdd.emit(contributor);
    this.resetForm();
  }

  firstName(): FormControl {
    return this.form.controls.firstName as FormControl;
  }

  lastName(): FormControl {
    return this.form.controls.lastName as FormControl;
  }

  identifier(): FormControl {
    return (this.form.controls.personId as FormGroup).controls.identifier as FormControl;
  }

  private resetForm(){
    this.show = false;
    this.form.reset();
    (this.form.controls.personId as FormGroup).controls.type.setValue(IdentifierType.ORCID);
  }

}
