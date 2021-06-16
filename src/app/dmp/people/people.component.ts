import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {ContributorRole} from '../../domain/enum/contributor-role.enum';
import {FormArray, FormControl} from '@angular/forms';
import {Person} from '../../domain/person';
import {ProjectMember} from '../../domain/project-member';

@Component({
  selector: 'app-dmp-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  @Input() projectMembers: ProjectMember[];

  roles: any = ContributorRole;

  @Input() contactStep: FormControl;
  @Input() contributorStep: FormArray;

  @Output() contactPerson = new EventEmitter<any>();
  @Output() contributorToAdd = new EventEmitter<any>();
  @Output() contributorToRemove = new EventEmitter<any>();
  @Output() contributorToUpdate = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  changeContactPerson(contact: Person) {
    this.contactPerson.emit(contact);
  }

  addContributor(contributor: Person) {
    this.contributorToAdd.emit(contributor);
  }

  removeContributor(index: number) {
    this.contributorToRemove.emit(index);
  }

  updateContributorRoles(index: number, role: ContributorRole, event: any) {
    if (event.source.selected) {
      this.contributorToUpdate.emit({index, role});
    }
  }

}
