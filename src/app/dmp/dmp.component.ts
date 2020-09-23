import {Component, Input, OnInit} from '@angular/core';
import {Dmp} from "../model/dmp";
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../services/backend.service";
import {Contributor} from "../model/contributor";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css']
})
export class DmpComponent implements OnInit {

  // @Input()
  // dmpForm = this.formBuilder.group({});
  dmp: Dmp;
  isLinear = false;

  constructor(
    // private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private backendService: BackendService,
    // private location: Location
  ) {
  }

  ngOnInit() {
    this.getDmpById();
    // this.dmpForm.valueChanges.subscribe(() => console.debug('DMPform Update'));
    // this.dmpForm.valueChanges.subscribe(newVal => console.debug(newVal));
  }

  getDmpById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.debug('Get DMP with ID: ' + id);
    if (id) {
      this.backendService.getDmpById(id)
        .subscribe(dmp => this.dmp = dmp);
    } else {
      this.dmp = new Dmp();
    }
  }

  setContactPerson($event: Contributor) {
    this.dmp.contact = $event;
  }

  unsetContactPerson() {
    this.dmp.contact = undefined;
  }

  addContributor($event: Contributor) {
    // todo
    this.dmp.addContributor($event);
  }

  removeContributor($event: Contributor) {
    // todo
    this.dmp.removeContributor($event);
  }

  updateContributorRoles($event: Contributor) {
    // todo
  }

  createDmp(): void {

  }

  updateDmp(): void {

  }
}
