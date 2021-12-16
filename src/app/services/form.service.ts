import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
import {SecurityMeasure} from '../domain/enum/security-measure';
import {Agreement} from '../domain/enum/agreement';
import {notEmptyValidator} from '../validators/not-empty.validator';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private TEXT_MAX_LENGTH = 4000;
  private TEXT_SHORT_LENGTH = 255;
  private readonly form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.createDmpForm();
  }

  get dmpForm(): FormGroup {
    return this.form;
  }

  private static restrictedDatasets(datasets: Dataset[]): boolean {
    return datasets.find(item => item.dataAccess === DataAccessType.restricted) != null;
  }

  private static closedDatasets(datasets: Dataset[]): boolean {
    return datasets.find(item => item.dataAccess === DataAccessType.closed) != null;
  }

  private createDmpForm(): FormGroup {
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
        personalDataCompliance: [[ComplianceType.INFORMED_CONSENT]],
        otherPersonalDataCompliance: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        sensitiveData: [false],
        sensitiveDataSecurity: [[], Validators.maxLength(this.TEXT_MAX_LENGTH)],
        otherDataSecurityMeasures: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        sensitiveDataAccess: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        legalRestrictions: [false],
        legalRestrictionsDocuments: [[]],
        otherLegalRestrictionsDocuments: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        legalRestrictionsComment: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        dataRightsAndAccessControl: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        humanParticipants: [false],
        ethicalIssues: [false],
        committeeReviewed: [false]
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

  public mapDmpToForm(dmp: Dmp) {

    this.resetForm();
    this.form.patchValue({
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
        personalDataCompliance: dmp.personalDataCompliance,
        otherPersonalDataCompliance: dmp.otherPersonalDataCompliance,
        sensitiveData: dmp.sensitiveData,
        sensitiveDataSecurity: dmp.sensitiveDataSecurity,
        otherDataSecurityMeasures: dmp.otherDataSecurityMeasures,
        sensitiveDataAccess: dmp.sensitiveDataAccess,
        legalRestrictions: dmp.legalRestrictions,
        legalRestrictionsDocuments: dmp.legalRestrictionsDocuments,
        otherLegalRestrictionsDocuments: dmp.otherLegalRestrictionsDocuments,
        legalRestrictionsComment: dmp.legalRestrictionsComment,
        dataRightsAndAccessControl: dmp.dataRightsAndAccessControl,
        humanParticipants: dmp.humanParticipants,
        ethicalIssues: dmp.ethicalIssuesExist,
        committeeReviewed: dmp.committeeReviewed,
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
        (this.form.controls.contributors as FormArray).push(this.mapContributorToFormGroup(contributor));
      }
    }
    if (dmp.datasets) {
      for (const dataset of dmp.datasets) {
        (this.form.controls.datasets as FormArray).push(this.mapDatasetToFormGroup(dataset));
      }
    }
    if (dmp.hosts) {
      for (const host of dmp.hosts) {
        (this.form.controls.hosts as FormArray).push(this.mapHostToFormGroup(host));
      }
    }
    if (dmp.costs) {
      for (const cost of dmp.costs) {
        (this.form.controls.costs.get('list') as FormArray).push(this.mapCostToFormGroup(cost));
      }
    }
    if (dmp.storage) {
      for (const storage of dmp.storage) {
        (this.form.controls.storage as FormArray).push(this.mapStorageToFormGroup(storage));
      }
    }
    if (dmp.externalStorage) {
      for (const externalStorage of dmp.externalStorage) {
        (this.form.controls.externalStorage as FormArray).push(this.mapExternalStorageToFormGroup(externalStorage));
      }
    }
  }

  public exportFormToDmp(): Dmp {
    const formValue = this.form.getRawValue();

    const result: Dmp = {
      closedAccessInfo: '',
      committeeReviewed: formValue.legal.humanParticipants,
      contributors: formValue.contributors,
      costs: formValue.costs?.exist ? formValue.costs.list : [],
      costsExist: formValue.costs?.exist,
      dataGeneration: '',
      dataKind: formValue.data.kind,
      datasets: [],
      ethicalIssuesExist: formValue.legal.ethicalIssues,
      externalStorage: [],
      externalStorageInfo: '',
      hosts: [],
      humanParticipants: formValue.legal.humanParticipants,
      legalRestrictions: false,
      legalRestrictionsDocuments: [],
      otherLegalRestrictionsDocuments: '',
      legalRestrictionsComment: '',
      dataRightsAndAccessControl: '',
      metadata: '',
      noDataExplanation: '',
      otherPersonalDataCompliance: '',
      personalData: false,
      personalDataCompliance: [],
      restrictedAccessInfo: '',
      restrictedDataAccess: '',
      sensitiveData: false,
      sensitiveDataSecurity: [],
      otherDataSecurityMeasures: '',
      sensitiveDataAccess: '',
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
      for (const dataset of result.datasets) {
        if (dataset.dataAccess !== DataAccessType.closed) {
          dataset.delete = false;
        }
        if (!dataset.delete) {
          dataset.dateOfDeletion = null;
          dataset.reasonForDeletion = ''
        }
      }
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
        result.sensitiveDataAccess = formValue.legal.sensitiveDataAccess;
        if (result.sensitiveDataSecurity.includes(SecurityMeasure.OTHER)) {
          result.otherDataSecurityMeasures = formValue.legal.otherDataSecurityMeasures;
        }
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
      } else {
        for (const dataset of result.datasets) {
          dataset.personalData = false;
        }
      }

      if (formValue.legal.legalRestrictions) {
        result.legalRestrictions = true;
        result.legalRestrictionsDocuments = formValue.legal.legalRestrictionsDocuments;
        result.dataRightsAndAccessControl = formValue.legal.dataRightsAndAccessControl;
        if (result.legalRestrictionsDocuments.includes(Agreement.OTHER)) {
          result.otherLegalRestrictionsDocuments = formValue.legal.otherLegalRestrictionsDocuments;
        }
        result.legalRestrictionsComment = formValue.legal.legalRestrictionsComment;
      } else {
        for (const dataset of result.datasets) {
          dataset.legalRestrictions = false;
        }
      }

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

  private resetForm(): void {
    this.form.reset();
    (this.form.controls.contributors as FormArray).clear();
    (this.form.controls.datasets as FormArray).clear();
    (this.form.controls.hosts as FormArray).clear();
    (this.form.controls.costs.get('list') as FormArray).clear();
    (this.form.controls.storage as FormArray).clear();
    (this.form.controls.externalStorage as FormArray).clear();
  }

  public addContributorToForm(contributor: Person) {
    const contributorFormGroup = this.createContributorFormGroup();
    contributorFormGroup.patchValue({person: contributor});
    (this.form.get('contributors') as FormArray).push(contributorFormGroup);
  }

  public removeContributorFromForm(index: number) {
    (this.form.get('contributors') as FormArray).removeAt(index);
  }

  public addDatasetToForm(reference: string, title: string) {
    const formGroup = this.createDatasetFormGroup(title);
    formGroup.patchValue({
      referenceHash: reference,
      startDate: this.form.value.project?.end || null,
      dateOfDeletion: this.form.value.project?.end || null,
    });
    (this.form.get('datasets') as FormArray).push(formGroup);
  }

  public updateDatasetOfForm(index: number, update: FormGroup) {
    const dataset = (this.form.get('datasets') as FormArray).at(index);
    dataset.patchValue(update.getRawValue());
  }

  public removeDatasetFromForm(index: number) {
    this.removeDatasetReferences(index);
    (this.form.get('datasets') as FormArray).removeAt(index);
  }

  public addFileAnalysisAsDatasetToForm(dataset: Dataset) {
    const formGroup = this.mapDatasetToFormGroup(dataset);
    formGroup.patchValue({
      startDate: this.form.value.project?.end || null
    });
    (this.form.get('datasets') as FormArray).push(formGroup);
  }

  public addStorageToForm(storage: Storage) {
    const storageFormGroup = this.createStorageFormGroup();
    storageFormGroup.patchValue({hostId: storage.hostId, title: storage.title});
    (this.form.get('storage') as FormArray).push(storageFormGroup);
  }

  public removeStorageFromForm(index: number) {
    (this.form.get('storage') as FormArray).removeAt(index);
  }

  public addExternalStorageToForm() {
    const externalStorageFormGroup = this.createExternalStorageFormGroup();
    const storage = this.form.get('externalStorage') as FormArray;
    const storageInfo = this.form.get('externalStorageInfo') as FormControl;
    storage.push(externalStorageFormGroup);

    if (storage.controls.length === 1) {
      storageInfo.addValidators(Validators.required);
    }
    storageInfo.updateValueAndValidity();
  }

  public removeExternalStorageFromForm(index: number) {
    const storage = this.form.get('externalStorage') as FormArray;
    storage.removeAt(index);
    const storageInfo = this.form.get('externalStorageInfo') as FormControl;

    if (storage.controls.length === 0) {
      storageInfo.removeValidators(Validators.required);
    }
    storageInfo.updateValueAndValidity();
  }

  public addRepositoryToForm(repo: { id: string, name: string }) {
    const hostFormGroup = this.createHostFormGroup();
    hostFormGroup.patchValue({
      hostId: repo.id,
      title: repo.name
    });
    (this.form.get('hosts') as FormArray).push(hostFormGroup);
  }

  public removeRepositoryFromForm(index: number) {
    (this.form.get('hosts') as FormArray).removeAt(index);
  }

  public addCostToForm() {
    const costFormGroup: FormGroup = this.createCostFormGroup();
    ((this.form.get('costs') as FormGroup).get('list') as FormArray).push(costFormGroup);
  }

  public removeCostFromForm(index: number) {
    ((this.form.get('costs') as FormGroup).get('list') as FormArray).removeAt(index);
  }

  public createDatasetFormGroup(title: string): FormGroup {
    return this.formBuilder.group({
      id: [null, {disabled: true}],
      title: [title, [Validators.required, Validators.maxLength(this.TEXT_SHORT_LENGTH), notEmptyValidator()]],
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
      publicAccess: [AccessRight.read],
      delete: [false],
      dateOfDeletion: [null],
      reasonForDeletion: ['', Validators.maxLength(4000)]
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
      id: contributor.id || null,
      person: contributor.person,
      role: contributor.role || null
    });
    return formGroup;
  }

  private createStorageFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null, {disabled: true}],
      hostId: [null, {disabled: true}],
      title: ['', [Validators.required, Validators.maxLength(this.TEXT_SHORT_LENGTH), notEmptyValidator()]],
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
      title: ['Other', [Validators.required, Validators.maxLength(this.TEXT_SHORT_LENGTH), notEmptyValidator()]],
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
      title: ['New cost', [Validators.required, Validators.maxLength(this.TEXT_SHORT_LENGTH), notEmptyValidator()]],
      currencyCode: ['EUR', [Validators.required, Validators.maxLength(this.TEXT_SHORT_LENGTH)]],
      value: [null, Validators.pattern(/^\d+[,.]?\d{0,2}$/)], // validate currency format
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

  private removeDatasetReferences(index: number) {
    const dataset = (this.form.get('datasets') as FormArray).at(index) as FormGroup;

    // Storage
    const storageStep = this.form.get('storage') as FormArray;
    this.removeDatasetReferenceInFormArray(storageStep, dataset);

    // External Storage
    const eStorageStep = this.form.get('externalStorage') as FormArray;
    this.removeDatasetReferenceInFormArray(eStorageStep, dataset);

    // Repositories
    const repoStep = this.form.get('hosts') as FormArray;
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
