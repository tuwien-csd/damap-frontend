import {Component, Input, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {ContributorRole} from '../../domain/enum/contributor-role.enum';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Person} from '../../domain/person';
import {ProjectMember} from '../../domain/project-member';

@Component({
  selector: 'app-dmp-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  @Input() dmpForm: FormGroup;
  @Input() people: ProjectMember[]; // list of people from backend

  peopleList: ProjectMember[] = []; // people minus contributors
  roles = {Editor: ContributorRole.EDITOR, Guest: ContributorRole.GUEST};

  contactStep: FormControl;
  contributorStep: FormArray;
  projectStep: FormControl;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.contactStep = this.dmpForm.get('contact') as FormControl;
    this.contributorStep = this.dmpForm.get('contributors') as FormArray;
    this.projectStep = this.dmpForm.get('project') as FormControl;
    this.projectStep.valueChanges.subscribe(newVal => {
      if (newVal) {
        const projectId = newVal.projectId;
        if (projectId) {
          this.getProjectMembers(projectId);
        }
      }
    });
  }

  setContactPerson(contact: Person) {
    this.contactStep.setValue(contact);
  }

  unsetContactPerson() {
    this.contactStep.reset();
  }

  addContributor(contributor: Person) {
    const contributorControl = new FormGroup({person: new FormControl(contributor), role: new FormControl(null)});
    this.contributorStep.push(contributorControl);
    this.filterPeople();
  }

  removeContributor(index: number) {
    this.contributorStep.removeAt(index);
    this.filterPeople();
  }

  updateContributorRoles(index: number, role: string, event: any) {
    if(event.source.selected) {
      const contributor = this.contributorStep.at(index);
      contributor.patchValue({role});
    }
  }

  private getProjectMembers(projectId: number) {
    this.backendService.getProjectMembers(projectId)
      .subscribe(members => {
        this.people = members;
        this.filterPeople();
      });
  }

  private filterPeople(): void {
    this.peopleList = Object.assign([], this.people);
    if (this. contributorStep != null && this.contributorStep.length > 0) {
      for (const entry of this.contributorStep.controls) {
        this.peopleList = this.peopleList.filter(e => e.person !== entry.value.person);
      }
    }
  }
}
