import {Component, Input, OnInit} from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {Contributor} from "../../model/contributor";
import {Observable, Subject} from "rxjs";
import {Project} from "../../model/project";
import {ContributorRole} from "../../model/enum/contributor-role.enum";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dmp-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  @Input() dmpForm: FormGroup;
  @Input() people: Contributor[]; // list of people from backend

  peopleList: Contributor[] = []; // people minus contributors
  roles = {'Editor': ContributorRole.editor, 'Guest': ContributorRole.guest};

  // todo: search
  contributors$: Observable<Project[]>;
  private searchTerms = new Subject<string>();

  contactStep: FormControl;
  contributorStep: FormArray;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.getPeople();
    this.contactStep = this.dmpForm.get('contact') as FormControl;
    this.contributorStep = this.dmpForm.get('contributors') as FormArray;
  }

  setContactPerson(contact: Contributor) {
    this.contactStep.setValue(contact);
  }

  unsetContactPerson() {
    this.contactStep.reset();
  }

  addContributor(contributor: Contributor) {
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
      contributor.patchValue({role: role});
    }
  }

  private getPeople(): void {
    this.backendService.getPersons()
      .subscribe(people => {
        this.people = people;
      });
    this.filterPeople();
  }

  private filterPeople(): void {
    this.peopleList = Object.assign([], this.people);
    if (this. contributorStep != null && this.contributorStep.length > 0) {
      for (let entry of this.contributorStep.controls) {
        this.peopleList = this.peopleList.filter(e => e !== entry.value.person);
      }
    }
  }
}
