import {Component, OnInit} from '@angular/core';
import {Dmp} from '../domain/dmp';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from '../services/backend.service';
import {FormBuilder} from '@angular/forms';
import {KeycloakService} from 'keycloak-angular';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css']
})
export class DmpComponent implements OnInit {

  public userId$: Observable<any>;

  dmpForm = this.formBuilder.group({
    project: [null],
    contact: [null],
    contributors: this.formBuilder.array([]),
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
    }),
    hosts: this.formBuilder.array([])
  });
  dmp: Dmp;
  isLinear = false;

  constructor(
    private auth: KeycloakService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private backendService: BackendService,
    // private location: Location
  ) {
  }

  ngOnInit() {
    this.userId$ = from(this.auth.loadUserProfile()).pipe(
      map(p => p['attributes']?.tissID?.find(Boolean))
    );
    this.getDmpById();
    this.dmpForm.valueChanges.subscribe(() => console.log('DMPform Update'));
    this.dmpForm.valueChanges.subscribe(newVal => console.log(newVal));
  }

  getDmpById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('Get DMP with ID: ' + id);
    if (id) {
      this.backendService.getDmpById(id)
        .subscribe(dmp => this.dmp = dmp);
    } else {
      this.dmp = new Dmp();
    }
  }

  createDmp(): void {

  }

  updateDmp(): void {

  }
}
