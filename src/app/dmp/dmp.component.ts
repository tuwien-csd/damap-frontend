import {Component, Input, OnInit} from '@angular/core';
import {Dmp} from "../model/dmp";
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../services/backend.service";
import {Project} from "../model/project";
import {Contributor} from "../model/contributor";

@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css']
})
export class DmpComponent implements OnInit {

  // @Input()
  dmp: Dmp;
  isLinear = true;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    // private location: Location
  ) {
  }

  ngOnInit() {
    this.getDmpById();
  }

  getDmpById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.backendService.getDmpById(id)
        .subscribe(dmp => this.dmp = dmp);
    } else {
      this.dmp = new Dmp();
    }
  }

  changeTitle(title: string): void {
    title = title.trim();
    this.dmp.title = title;
  }

  changeDescription(description: string): void {
    description = description.trim();
    this.dmp.description = description;

  }

  addProject(project: Project): void {
    // console.log("DMP - add project"); // fixme: debug statement
    this.dmp.addProject(project);
  }

  removeProject(project: Project): void {
    // console.log("DMP - remove project"); // fixme: debug statement
    this.dmp.removeProject(project);
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
