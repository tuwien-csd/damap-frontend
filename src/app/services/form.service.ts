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
import {DataKind} from '../domain/enum/data-kind.enum';
import {ComplianceType} from '../domain/enum/compliance-type.enum';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private TEXT_MAX_LENGTH = 4000;
  private TEXT_SHORT_LENGTH = 255;

  constructor(private formBuilder: FormBuilder) {
  }

  private static restrictedDatasets(datasets: Dataset[]): boolean {
    return datasets.find(item => item.dataAccess === DataAccessType.restricted) != null;
  }

  private static closedDatasets(datasets: Dataset[]): boolean {
    return datasets.find(item => item.dataAccess === DataAccessType.closed) != null;
  }

  public createDmpForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      project: [null],
      contact: [null],
      contributors: this.formBuilder.array([]),
      data: this.formBuilder.group({
        kind: [null],
        explanation: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      }),
      datasets: this.formBuilder.array([]),
      documentation: this.formBuilder.group({
        metadata: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        dataGeneration: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        structure: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)]
      }),
      storage: this.formBuilder.array([]),
      externalStorage: this.formBuilder.array([]),
      externalStorageInfo: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      legal: this.formBuilder.group({
        personalData: [false],
        personalDataAccess: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        personalDataCompliance: [[]],
        otherPersonalDataCompliance: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        sensitiveData: [false],
        legalRestrictions: [false],
        legalRestrictionsComment: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        ethicalIssues: [false],
        committeeApproved: [false],
        sensitiveDataSecurity: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        ethicsReport: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        ethicalComplianceStatement: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      }),
      hosts: this.formBuilder.array([]),
      reuse: this.formBuilder.group({
        targetAudience: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        tools: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        restrictedDataAccess: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)]
      }),
      restrictedAccessInfo: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      closedAccessInfo: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
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
        ethicalComplianceStatement: dmp.ethicalComplianceStatement,
      },
      reuse: {
        targetAudience: dmp.targetAudience,
        tools: dmp.tools,
        restrictedDataAccess: dmp.restrictedDataAccess
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

    const result: Dmp = {
      closedAccessInfo: '',
      committeeApproved: false,
      contributors: formValue.contributors,
      costs: formValue.costs?.exist ? formValue.costs.list : [],
      costsExist: formValue.costs?.exist,
      dataGeneration: '',
      dataKind: formValue.data.kind,
      datasets: [],
      ethicalComplianceStatement: '',
      ethicalIssuesExist: false,
      ethicsReport: '',
      externalStorage: [],
      externalStorageInfo: '',
      hosts: [],
      legalRestrictions: false,
      legalRestrictionsComment: '',
      metadata: '',
      noDataExplanation: '',
      otherPersonalDataCompliance: '',
      personalData: false,
      personalDataAccess: '',
      personalDataCompliance: [],
      restrictedAccessInfo: '',
      restrictedDataAccess: '',
      sensitiveData: false,
      sensitiveDataSecurity: '',
      storage: [],
      structure: '',
      targetAudience: '',
      tools: '',
      id: formValue.id,
      project: formValue.project,
      contact: formValue.contact
    };

    if (formValue.data.kind === DataKind.SPECIFY) {
      result.datasets = formValue.datasets;
      result.hosts = formValue.hosts;
      result.storage = formValue.storage;
      result.externalStorage = formValue.externalStorage;

      result.metadata = formValue.documentation.metadata;
      result.dataGeneration = formValue.documentation.dataGeneration;
      result.structure = formValue.documentation.structure;
      result.externalStorageInfo = formValue.externalStorageInfo;

      // Legal
      if (formValue.legal.sensitiveData) {
        result.sensitiveData = true;
        result.sensitiveDataSecurity = formValue.legal.sensitiveDataSecurity;
      } else {
        for (const dataset of result.datasets) {
          dataset.sensitiveData = false;
        }
      }

      if (formValue.legal.personalData) {
        result.personalData = true;
        result.personalDataCompliance = formValue.legal.personalDataCompliance;
        result.otherPersonalDataCompliance = result.personalDataCompliance.includes(ComplianceType.Other) ?
          formValue.legal.otherPersonalDataCompliance : '';
        result.personalDataAccess = formValue.legal.personalDataAccess;
      } else {
        for (const dataset of result.datasets) {
          dataset.personalData = false;
        }
      }

      if (formValue.legal.legalRestrictions) {
        result.legalRestrictions = true;
        result.legalRestrictionsComment = formValue.legal.legalRestrictionsComment;
      } else {
        for (const dataset of result.datasets) {
          dataset.legalRestrictions = false;
        }
      }

      if (formValue.legal.ethicalIssues) {
        result.ethicalIssuesExist = true;
        result.committeeApproved = formValue.legal.committeeApproved;
        result.ethicsReport = result.committeeApproved ? formValue.legal.ethicsReport : '';
      }
      result.ethicalComplianceStatement = formValue.legal.ethicalComplianceStatement;

      // Reuse
      result.targetAudience = formValue.reuse.targetAudience;
      result.restrictedDataAccess = formValue.reuse.restrictedDataAccess;
      result.tools = formValue.reuse.tools;

      // Licensing
      result.restrictedAccessInfo = FormService.restrictedDatasets(result.datasets) ? formValue.restrictedAccessInfo : '';
      result.closedAccessInfo = FormService.closedDatasets(result.datasets) ? formValue.closedAccessInfo : '';
    } else {
      result.noDataExplanation = formValue.data.kind === DataKind.NONE ? formValue.data.explanation : '';
    }

    return result;
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
      license: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      startDate: [null],
      type: [null],
      size: [null],
      comment: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      personalData: [false],
      sensitiveData: [false],
      legalRestrictions: [false],
      dataAccess: [DataAccessType.open],
      referenceHash: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      selectedProjectMembersAccess: [AccessRight.write],
      otherProjectMembersAccess: [AccessRight.write],
      publicAccess: [AccessRight.read]
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
      title: ['', [Validators.required, Validators.maxLength(this.TEXT_SHORT_LENGTH)]],
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
      title: ['Other', [Validators.required, Validators.maxLength(this.TEXT_SHORT_LENGTH)]],
      storageLocation: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      backupLocation: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      backupFrequency: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
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
      title: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
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
      title: ['New cost', [Validators.required, Validators.maxLength(this.TEXT_SHORT_LENGTH)]],
      currencyCode: ['EUR', [Validators.required, Validators.maxLength(this.TEXT_SHORT_LENGTH)]],
      value: [null, Validators.pattern('^[0-9]*\.?[0-9]{0,2}$')], // validate format
      type: [null],
      customType: [null],
      description: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)]
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
