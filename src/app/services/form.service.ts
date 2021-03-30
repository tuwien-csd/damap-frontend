import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Dmp} from '../domain/dmp';
import {Contributor} from '../domain/contributor';
import {Dataset} from '../domain/dataset';
import {Host} from '../domain/host';
import {Person} from '../domain/person';
import {Cost} from '../domain/cost';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private formBuilder: FormBuilder) {
  }

  public createDmpForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      project: [null],
      contact: [null],
      contributors: this.formBuilder.array([]),
      data: this.formBuilder.group({
        kind: [null],
        explanation: [''],
      }),
      datasets: this.formBuilder.array([]),
      documentation: this.formBuilder.group({
        metadata: [''],
        dataGeneration: [''],
        structure: ['']
      }),
      legal: this.formBuilder.group({
        personalInformation: [null],
        sensitiveData: [null],
        legalRestrictions: [null],
        ethicalIssues: [null],
        committeeApproved: [null],
        sensitiveDataSecurity: [''],
        ethicsReport: [''],
        optionalStatement: [''],
      }),
      storage: this.formBuilder.array([]),
      externalStorage: this.formBuilder.array([]),
      hosts: this.formBuilder.array([]),
      reuse: this.formBuilder.group({
        targetAudience: [''],
        tools: [''],
        restrictedAccess: ['']
      }),
      costs: this.formBuilder.group({
        exist: [null],
        list: this.formBuilder.array([])
      })
    });
  }

  // TODO: Fix data model and mapping
  public mapDmpToForm(dmp: Dmp, form: FormGroup): FormGroup {

    form.patchValue({
      id: dmp.id,
      project: dmp.project,
      contact: dmp.contact,
      data: {
        kind: dmp.dataKind,
        explanation: dmp.noDataExplanation,
      },
      documentation: {
        metadata: dmp.metadata,
        dataGeneration: dmp.dataGeneration,
        structure: dmp.structure,
        targetAudience: dmp.targetAudience
      },
      legal: {
        personalInformation: dmp.project,
        sensitiveData: dmp.sensitiveData,
        legalRestrictions: dmp.legalRestrictions,
        ethicalIssues: dmp.ethicalIssuesExist,
        committeeApproved: dmp.committeeApproved,
        sensitiveDataSecurity: dmp.sensitiveDataSecurity,
        ethicsReport: dmp.ethicsReport,
        optionalStatement: dmp.ethicalComplianceStatement,
      },
      reuse: {
        targetAudience: dmp.targetAudience,
        tools: dmp.tools,
        restrictedAccess: dmp.restrictedDataAccess
      },
      costs: {
        exist: dmp.costsExist
      }
    });

    // Contributors, datasets, hosts, costs
    for (const contributor of dmp.contributors) {
      (form.controls.contributors as FormArray).push(
        this.formBuilder.group({
          person: [contributor.person],
          role: contributor.role
        }));
    }
    for (const dataset of dmp.datasets) {
      (form.controls.datasets as FormArray).push(this.mapDatasetToFormGroup(dataset));
    }
    for (const host of dmp.hosts) {
      (form.controls.hosts as FormArray).push(this.mapHostToFormGroup(host));
    }
    for (const cost of dmp.costs) {
      (form.controls.costs.get('list') as FormArray).push(this.mapCostToFormGroup(cost));
    }
    return form;
  }

  // TODO: Fix data model and mapping
  public exportFormToDmp(form: FormGroup): Dmp {
    const formValue = form.getRawValue();

    const contributors: Contributor[] = [];
    if (formValue.contributors?.length > 0) {
      for (const contributor of formValue.contributors) {
        contributors.push(contributor);
      }
    }

    const datasets: Dataset[] = [];
    if (formValue.data?.datasets?.length > 0) {
      for (const dataset of formValue.data.datasets) {
        datasets.push(dataset);
      }
    }

    const hosts: Host[] = [];
    if (formValue.hosts?.length > 0) {
      for (const host of formValue.hosts) {
        hosts.push(host);
      }
    }

    const costs: Cost[] = [];
    if (formValue.costs?.list?.length > 0) {
      for (const cost of formValue.costs.list) {
        costs.push(cost);
      }
    }

    const storage: Storage[] = [];
    if (formValue.storage?.length > 0) {
      for (const item of formValue.storage) {
        storage.push(item);
      }
    }

    const externalStorage: Storage[] = [];
    if (formValue.externalStorage?.length > 0) {
      for (const item of formValue.externalStorage) {
        externalStorage.push(item);
      }
    }

    return {
      project: formValue.project,
      contact: formValue.contact,
      contributors,
      dataKind: formValue.data.kind,
      noDataExplanation: formValue.data.explanation,
      datasets,
      metadata: formValue.documentation.metadata,
      dataGeneration: formValue.documentation.dataGeneration,
      structure: formValue.documentation.structure,
      personalInformation: formValue.legal.personalInformation,
      sensitiveData: formValue.legal.sensitiveData,
      legalRestrictions: formValue.legal.legalRestrictions,
      ethicalIssuesExist: formValue.legal.ethicalIssues,
      committeeApproved: formValue.legal.committeeApproved,
      sensitiveDataSecurity: formValue.legal.sensitiveData ? formValue.legal.sensitiveDataSecurity : '',
      ethicsReport: formValue.legal.ethicsReport,
      ethicalComplianceStatement: formValue.legal.optionalStatement,
      targetAudience: formValue.reuse.targetAudience,
      restrictedDataAccess: formValue.reuse.restrictedAccess,
      tools: formValue.reuse.tools,
      storage,
      externalStorage,
      hosts,
      costsExist: formValue.costs?.exist,
      costs
    };
  }

  public addContributorToForm(form: FormGroup, contributor: Person) {
    const contributorControl = new FormGroup({person: new FormControl(contributor), role: new FormControl(null)});
    (form.get('contributors') as FormArray).push(contributorControl);
  }

  public removeContributorFromForm(form: FormGroup, index: number) {
    (form.get('contributors') as FormArray).removeAt(index);
  }

  public addStorageToForm(form: FormGroup, storage: Storage) {
    const storageGroup = this.formBuilder.group({
      id: [storage.id],
      title: [storage.title],
      datasets: [null]
    });
    (form.get('storage') as FormArray).push(storageGroup);
  }

  public removeStorageFromForm(form: FormGroup, index: number) {
    (form.get('storage') as FormArray).removeAt(index);
  }

  public addExternalStorageToForm(form: FormGroup) {
    const externalStorageGroup = this.formBuilder.group({
      title: ['Other', Validators.required],
      storageLocation: [''],
      backupLocation: [''],
      backupFrequency: [''],
      datasets: [null]
    });
    (form.get('externalStorage') as FormArray).push(externalStorageGroup);
  }

  public removeExternalStorageFromForm(form: FormGroup, index: number) {
    (form.get('externalStorage') as FormArray).removeAt(index);
  }

  public addRepositoryToForm(form: FormGroup, repo: {id: string, name: string}) {
    const repoGroup = this.formBuilder.group({
      id: repo.id,
      title: repo.name,
      datasets: [''],
      date: ['']
    });
    (form.get('hosts') as FormArray).push(repoGroup);
  }

  public removeRepositoryFromForm(form: FormGroup, index: number) {
    (form.get('hosts') as FormArray).removeAt(index);
  }
  public addCostToForm(form: FormGroup) {
    const costFormGroup: FormGroup = this.createCostFormGroup();
    ((form.get('costs') as FormGroup).get('list') as FormArray).push(costFormGroup);
  }

  public removeCostFromForm(form: FormGroup, index: number) {
    ((form.get('costs') as FormGroup).get('list') as FormArray).removeAt(index);
  }

  private createDatasetFormGroup(title: string): FormGroup {
    return this.formBuilder.group({
      title: [title, Validators.required],
      publish: [false],
      license: [''],
      startDate: [null],
      type: [null],
      size: [''],
      comment: [''],
      referenceHash: ['']
    });
  }

  private mapDatasetToFormGroup(dataset: Dataset): FormGroup {
    const formGroup = this.createDatasetFormGroup(dataset.title);
    formGroup.patchValue({
      publish: dataset.publish || false,
      license: dataset.license,
      startDate: dataset.startDate || null,
      type: dataset.type || null,
      size: dataset.type,
      comment: dataset.comment,
      referenceHash: dataset.referenceHash
    })
    return formGroup;
  }

  private createHostFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      title: [''],
      date: [null],
      datasets: ['']
    });
  }

  private mapHostToFormGroup(host: Host): FormGroup {
    const formGroup = this.createHostFormGroup();
    formGroup.patchValue({
      id: host.id,
      title: host.title || '',
      date: host.date || null,
      datasets: host.datasets
    });
    return formGroup;
  }

  private createCostFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null, {disabled: true}],
      title: ['New cost', Validators.required],
      currency_code: ['EUR', Validators.required],
      value: [null, Validators.pattern('^[0-9]*\.?[0-9]{0,2}$')], // validate format
      type: [null],
      customType: [null],
      description: ['']
    });
  }

  private mapCostToFormGroup(cost: Cost): FormGroup {
    const formGroup = this.createCostFormGroup();
    formGroup.setValue({
      id: cost.id,
      title: cost.title,
      currency_code: cost.currency_code,
      value: cost.value,
      type: cost.type,
      customType: cost.customType,
      description: cost.description
    });
    return formGroup;
  }
}
