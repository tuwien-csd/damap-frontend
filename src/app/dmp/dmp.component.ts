import {Component, OnInit} from '@angular/core';
import {Dmp} from '../domain/dmp';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from '../services/backend.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {KeycloakService} from 'keycloak-angular';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Person} from '../domain/person';
import {ProjectMember} from '../domain/project-member';
import {ContributorRole} from '../domain/enum/contributor-role.enum';
import {Project} from '../domain/project';

@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css']
})
export class DmpComponent implements OnInit {

  public userId$: Observable<any>;
  userId: string;

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

  // Steps
  projectStep: FormControl;
  contactStep: FormControl;
  contributorStep: FormArray;
  specifyDataStep: FormGroup;
  datasets: FormArray;
  docDataStep: FormGroup;
  legalEthicalStep: FormGroup;
  repoStep: FormArray;

  // Resources
  projects: Project[];
  people: ProjectMember[];
  peopleList: ProjectMember[] = []; // people minus contributors
  repositories: any;//: Observable<any>;

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
    this.userId$.subscribe(userId => {
      this.userId = userId;
      this.getSuggestedProjects(userId);
    });
    this.getDmpById();
    this.dmpForm.valueChanges.subscribe(() => console.log('DMPform Update'));
    this.dmpForm.valueChanges.subscribe(newVal => console.log(newVal));
    this.projectStep = this.dmpForm.get('project') as FormControl;
    this.contactStep = this.dmpForm.get('contact') as FormControl;
    this.contributorStep = this.dmpForm.get('contributors') as FormArray;
    this.specifyDataStep = this.dmpForm.get('data') as FormGroup;
    this.datasets = this.specifyDataStep.get('datasets') as FormArray;
    this.docDataStep = this.dmpForm.get('documentation') as FormGroup;
    this.legalEthicalStep = this.dmpForm.get('legal') as FormGroup;
    this.repoStep = this.dmpForm.get('hosts') as FormArray;

    this.projectStep.valueChanges.subscribe(newVal => {
      if (newVal) {
        const projectId = newVal.id;
        if (projectId) {
          this.getProjectMembers(projectId);
        }
      }
    });

    this.getRepositories();
  }

  getDmpById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('Get DMP with ID: ' + id);
    // TODO
  }

  createDmp(): void {

  }

  updateDmp(): void {

  }

  changeProject(project: Project) {
    if (project != null) {
      this.projectStep.setValue(project);
    } else {
      this.projectStep.reset();
    }
  }

  changeContactPerson(contact: Person) {
    if (contact != null) {
      this.contactStep.setValue(contact);
    } else {
      this.contactStep.reset();
    }
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

  updateContributorRoles($event: { index: number, role: ContributorRole }) {
    const index = $event.index;
    const role = $event.role;
    const contributor = this.contributorStep.at(index);
    contributor.patchValue({role});
  }

  createDataset(title: string) {
    this.datasets.push(this.formBuilder.group({
        title: [title, Validators.required],
        publish: [false],
        license: [''],
        startDate: [null],
        type: [null],
        size: [''],
        comment: [''],
        referenceHash: this.userId + (+new Date()).toString(36)
      })
    );
  }

  updateDataset(event: { index: number, update: FormGroup }) {
    const dataset = this.datasets.at(event.index);
    dataset.patchValue({
      title: event.update.value.title,
      type: event.update.value.type,
      size: event.update.value.size,
      comment: event.update.value.comment
    });
  }

  removeDataset(index: number) {
    this.removeRepoDatasets(this.datasets.at(index));
    this.datasets.removeAt(index);
  }

  addRepository(repo: any) {
    const repoGroup = this.formBuilder.group({
      id: repo.id,
      name: repo.name,
      datasets: [''],
      date: ['']
    });
    this.repoStep.push(repoGroup);
  }

  removeRepository(index: number): void {
    this.repoStep.removeAt(index);
  }

  getRepositoryDetails(repo) {
    if (!repo.info) {
      let repoInfo;
      this.backendService.getRepositoryById(repo.id).subscribe((data: JSON) => {
        repoInfo = data;
        if (repoInfo && this.repositories.length > 0) {
          const index = this.repositories.map(e => e.id).indexOf(repo.id);
          this.repositories[index].info = repoInfo;
        }
      });
    }
  }

  private getSuggestedProjects(userId: number) {
    this.backendService.getSuggestedProjects(userId)
      .subscribe(projects => {
        this.projects = projects;
      });
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
    if (this.contributorStep != null && this.contributorStep.length > 0) {
      for (const entry of this.contributorStep.controls) {
        this.peopleList = this.peopleList.filter(e => e.person !== entry.value.person);
      }
    }
  }

  private removeRepoDatasets(dataset) {
    for (let i = 0; i < this.repoStep.controls.length; i++) {
      const host = this.repoStep.at(i);
      for (let j = 0; j < host.value.datasets.length; j++) {
        const repoDataset = host.value.datasets[j];
        if (dataset.value.referenceHash === repoDataset.referenceHash) {
          host.value.datasets.slice(j, 1);
        }
      }
    }
  }

  private getRepositories() {
    this.backendService.getRepositories().subscribe((data: JSON) => {
      this.repositories = data;
    });;
  }
}
