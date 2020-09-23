import {Component, Input, OnInit} from '@angular/core';
import {Dmp} from "../model/dmp";
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../services/backend.service";
import {Contributor} from "../model/contributor";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css']
})
export class DmpComponent implements OnInit {

  // @Input()
  dmpForm = this.formBuilder.group({
    project: [null],
    contact: [null],
    data: this.formBuilder.group({
      kind: [null],
      explanation: [''],
      datasets: this.formBuilder.array([])
    }),
    documentation: this.formBuilder.group({
      metadata: [''],
      dataGeneration: [''],
      structure: [''],
      targetAudience: ['']
    }),
    legal: this.formBuilder.group({
      personalInformation: [null],
      sensitiveData: [null],
      legalRestrictions: [null],
      ethicalIssues: [null],
      committeeApproved: [null],
      ethicsReport: [''],
      optionalStatement: [''],
    })
  });
  dmp: Dmp;
  isLinear = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private backendService: BackendService,
    // private location: Location
  ) {
  }

  ngOnInit() {
    this.getDmpById();
    this.dmpForm.valueChanges.subscribe(() => console.debug('DMPform Update'));
    this.dmpForm.valueChanges.subscribe(newVal => console.debug(newVal));
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
