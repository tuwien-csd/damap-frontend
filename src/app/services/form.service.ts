import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Dmp} from '../domain/dmp';
import {Contributor} from '../domain/contributor';
import {Dataset} from '../domain/dataset';
import {Host} from '../domain/host';
import {Person} from '../domain/person';
import {Cost} from '../domain/cost';
import {DataAccessType} from '../domain/enum/data-access-type.enum';
import {Storage} from '../domain/storage';
import {AccessRight} from '../domain/enum/access-right';

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
      storage: this.formBuilder.array([]),
      externalStorage: this.formBuilder.array([]),
      externalStorageInfo: [''],
      legal: this.formBuilder.group({
        personalData: [false],
        personalDataAccess: [''],
        personalDataCompliance: [[]],
        otherPersonalDataCompliance: [''],
        sensitiveData: [false],
        legalRestrictions: [false],
        legalRestrictionsComment: [''],
        ethicalIssues: [false],
        committeeApproved: [false],
        sensitiveDataSecurity: [''],
        ethicsReport: [''],
        optionalStatement: [''],
      }),
      hosts: this.formBuilder.array([]),
      reuse: this.formBuilder.group({
        targetAudience: [''],
        tools: [''],
        restrictedAccess: ['']
      }),
      restrictedAccessInfo: [''],
      closedAccessInfo: [''],
      costs: this.formBuilder.group({
        exist: [null],
        list: this.formBuilder.array([])
      })
    });
  }

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
      externalStorageInfo: dmp.externalStorageInfo,
      legal: {
        personalData: dmp.personalData,
        personalDataAccess: dmp.personalDataAccess,
        personalDataCompliance: dmp.personalDataCompliance,
        otherPersonalDataCompliance: dmp.otherPersonalDataCompliance,
        sensitiveData: dmp.sensitiveData,
        legalRestrictions: dmp.legalRestrictions,
        legalRestrictionsComment: dmp.legalRestrictionsComment,
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
      },
      restrictedAccessInfo: dmp.restrictedAccessInfo,
      closedAccessInfo: dmp.closedAccessInfo,
    });

    // Contributors, datasets, hosts, costs
    if (dmp.contributors) {
      for (const contributor of dmp.contributors) {
        (form.controls.contributors as FormArray).push(this.mapContributorToFormGroup(contributor));
      }
    }
    if (dmp.datasets) {
      for (const dataset of dmp.datasets) {
        (form.controls.datasets as FormArray).push(this.mapDatasetToFormGroup(dataset));
      }
    }
    if (dmp.hosts) {
      for (const host of dmp.hosts) {
        (form.controls.hosts as FormArray).push(this.mapHostToFormGroup(host));
      }
    }
    if (dmp.costs) {
      for (const cost of dmp.costs) {
        (form.controls.costs.get('list') as FormArray).push(this.mapCostToFormGroup(cost));
      }
    }
    if (dmp.storage) {
      for (const storage of dmp.storage) {
        (form.controls.storage as FormArray).push(this.mapStorageToFormGroup(storage));
      }
    }
    if (dmp.externalStorage) {
      for (const externalStorage of dmp.externalStorage) {
        (form.controls.externalStorage as FormArray).push(this.mapExternalStorageToFormGroup(externalStorage));
      }
    }
    return form;
  }

  public exportFormToDmp(form: FormGroup): Dmp {
    const formValue = form.getRawValue();

    const contributors: Contributor[] = [];
    if (formValue.contributors?.length > 0) {
      for (const contributor of formValue.contributors) {
        contributors.push(contributor);
      }
    }

    const datasets: Dataset[] = [];
    if (formValue.datasets?.length > 0) {
      for (const dataset of formValue.datasets) {
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
      id: formValue.id,
      project: formValue.project,
      contact: formValue.contact,
      contributors,
      dataKind: formValue.data.kind,
      noDataExplanation: formValue.data.explanation,
      datasets,
      metadata: formValue.documentation.metadata,
      dataGeneration: formValue.documentation.dataGeneration,
      structure: formValue.documentation.structure,
      personalData: formValue.legal.personalData,
      personalDataAccess: formValue.legal.personalDataAccess,
      personalDataCompliance: formValue.legal.personalDataCompliance,
      otherPersonalDataCompliance: formValue.legal.otherPersonalDataCompliance,
      sensitiveData: formValue.legal.sensitiveData,
      legalRestrictions: formValue.legal.legalRestrictions,
      legalRestrictionsComment: formValue.legal.legalRestrictionsComment,
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
      externalStorageInfo: formValue.externalStorageInfo,
      hosts,
      restrictedAccessInfo: formValue.restrictedAccessInfo,
      closedAccessInfo: formValue.closedAccessInfo,
      costsExist: formValue.costs?.exist,
      costs
    };
  }

  public addContributorToForm(form: FormGroup, contributor: Person) {
    const contributorFormGroup = this.createContributorFormGroup();
    contributorFormGroup.patchValue({person: contributor});
    (form.get('contributors') as FormArray).push(contributorFormGroup);
  }

  public removeContributorFromForm(form: FormGroup, index: number) {
    (form.get('contributors') as FormArray).removeAt(index);
  }

  public addDatasetToForm(form: FormGroup, reference: string, title: string) {
    const formGroup = this.createDatasetFormGroup(title);
    formGroup.patchValue({
      referenceHash: reference,
      startDate: form.value.project?.end || null
    });
    (form.get('datasets') as FormArray).push(formGroup);
  }

  public updateDatasetOfForm(form: FormGroup, index: number, update: FormGroup) {
    const dataset = (form.get('datasets') as FormArray).at(index);
    dataset.patchValue(update.getRawValue());
  }

  public removeDatasetFromForm(form: FormGroup, index: number) {
    this.removeDatasetReferences(form, index);
    (form.get('datasets') as FormArray).removeAt(index);
  }

  public addFileAnalysisAsDatasetToForm(form: FormGroup, dataset: Dataset) {
    const formGroup = this.mapDatasetToFormGroup(dataset);
    formGroup.patchValue({
      startDate: form.value.project?.end || null
    });
    (form.get('datasets') as FormArray).push(formGroup);
  }

  public addStorageToForm(form: FormGroup, storage: Storage) {
    const storageFormGroup = this.createStorageFormGroup();
    storageFormGroup.patchValue({hostId: storage.hostId, title: storage.title});
    (form.get('storage') as FormArray).push(storageFormGroup);
  }

  public removeStorageFromForm(form: FormGroup, index: number) {
    (form.get('storage') as FormArray).removeAt(index);
  }

  public addExternalStorageToForm(form: FormGroup) {
    const externalStorageFormGroup = this.createExternalStorageFormGroup();
    (form.get('externalStorage') as FormArray).push(externalStorageFormGroup);
  }

  public removeExternalStorageFromForm(form: FormGroup, index: number) {
    (form.get('externalStorage') as FormArray).removeAt(index);
  }

  public addRepositoryToForm(form: FormGroup, repo: { id: string, name: string }) {
    const hostFormGroup = this.createHostFormGroup();
    hostFormGroup.patchValue({
      hostId: repo.id,
      title: repo.name
    });
    (form.get('hosts') as FormArray).push(hostFormGroup);
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

  public createDatasetFormGroup(title: string): FormGroup {
    return this.formBuilder.group({
      id: [null, {disabled: true}],
      title: [title, Validators.required],
      license: [''],
      startDate: [null],
      type: [null],
      size: [null],
      comment: [''],
      personalData: [false],
      sensitiveData: [false],
      legalRestrictions: [false],
      dataAccess: [DataAccessType.open],
      referenceHash: [''],
      selectedProjectMembersAccess: AccessRight.write,
      otherProjectMembersAccess: AccessRight.write,
      publicAccess: AccessRight.read
    });
  }

  private mapDatasetToFormGroup(dataset: Dataset): FormGroup {
    const formGroup = this.createDatasetFormGroup(dataset.title);
    formGroup.patchValue(dataset);
    return formGroup;
  }

  private createContributorFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null, {disabled: true}],
      person: [null],
      role: [null]
    });
  }

  private mapContributorToFormGroup(contributor: Contributor): FormGroup {
    const formGroup = this.createContributorFormGroup();
    formGroup.setValue({
      id: contributor.id,
      person: contributor.person,
      role: contributor.role || null
    });
    return formGroup;
  }

  private createStorageFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null, {disabled: true}],
      hostId: [null, {disabled: true}],
      title: ['', Validators.required],
      datasets: [[]]
    });
  }

  private mapStorageToFormGroup(storage: Storage): FormGroup {
    const formGroup = this.createStorageFormGroup();
    formGroup.patchValue({
      id: storage.id,
      hostId: storage.hostId || null,
      title: storage.title,
      datasets: storage.datasets || []
    });
    return formGroup;
  }

  private createExternalStorageFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null, {disabled: true}],
      title: ['Other', Validators.required],
      storageLocation: [''],
      backupLocation: [''],
      backupFrequency: [''],
      datasets: [[]]
    });
  }

  private mapExternalStorageToFormGroup(externalStorage: Storage): FormGroup {
    const formGroup = this.createExternalStorageFormGroup();
    formGroup.setValue({
      id: externalStorage.id,
      title: externalStorage.title,
      storageLocation: externalStorage.storageLocation || null,
      backupLocation: externalStorage.backupLocation || null,
      backupFrequency: externalStorage.backupFrequency || null,
      datasets: externalStorage.datasets || []
    });
    return formGroup;
  }

  private createHostFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null, {disabled: true}],
      hostId: [null],
      title: [''],
      date: [null],
      datasets: [[]]
    });
  }

  private mapHostToFormGroup(host: Host): FormGroup {
    const formGroup = this.createHostFormGroup();
    formGroup.patchValue({
      id: host.id,
      hostId: host.hostId,
      title: host.title || '',
      date: host.date || null,
      datasets: host.datasets || []
    });
    return formGroup;
  }

  private createCostFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null, {disabled: true}],
      title: ['New cost', Validators.required],
      currencyCode: ['EUR', Validators.required],
      value: [null, Validators.pattern('^[0-9]*\.?[0-9]{0,2}$')], // validate format
      type: [null],
      customType: [null],
      description: ['']
    });
  }

  private mapCostToFormGroup(cost: Cost): FormGroup {
    const formGroup = this.createCostFormGroup();
    formGroup.setValue({
      id: cost.id || null,
      title: cost.title,
      currencyCode: cost.currencyCode || 'EUR',
      value: cost.value || null,
      type: cost.type || null,
      customType: cost.customType || null,
      description: cost.description || ''
    });
    return formGroup;
  }

  private removeDatasetReferences(form: FormGroup, index: number) {
    const dataset = (form.get('datasets') as FormArray).at(index) as FormGroup;

    // Storage
    const storageStep = form.get('storage') as FormArray;
    this.removeDatasetReferenceInFormArray(storageStep, dataset);

    // External Storage
    const eStorageStep = form.get('externalStorage') as FormArray;
    this.removeDatasetReferenceInFormArray(eStorageStep, dataset);

    // Repositories
    const repoStep = form.get('hosts') as FormArray;
    this.removeDatasetReferenceInFormArray(repoStep, dataset);
  }

  private removeDatasetReferenceInFormArray(array: FormArray, dataset: FormGroup) {
    for (let i = 0; i < array.controls?.length; i++) {
      const item = array.at(i);
      const datasets = item.value.datasets.filter(entry => entry !== dataset.value.referenceHash);
      item.patchValue({datasets});
    }
  }
}
