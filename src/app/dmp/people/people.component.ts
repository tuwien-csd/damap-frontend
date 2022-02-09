import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContributorRole} from '../../domain/enum/contributor-role.enum';
import {FormArray, FormGroup} from '@angular/forms';
import {Contributor} from '../../domain/contributor';

@Component({
  selector: 'app-dmp-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {

  @Input() projectMembers: Contributor[];

  roles: any = ContributorRole;

  translateEnumPrefix = 'enum.contributor.role.'

  @Input() dmpForm: FormGroup;

  @Output() contactPerson = new EventEmitter<any>();
  @Output() contributorToAdd = new EventEmitter<any>();
  @Output() contributorToRemove = new EventEmitter<any>();
  @Output() contributorToUpdate = new EventEmitter<any>();

  constructor() {
  }

  changeContactPerson(contact: Contributor) {
    this.contactPerson.emit(contact);
  }

  addContributor(contributor: Contributor) {
    this.contributorToAdd.emit(contributor);
  }

  removeContributor(index: number) {
    this.contributorToRemove.emit(index);
  }

  get contributors(): FormArray {
    return this.dmpForm.get('contributors') as FormArray;
  }

}
