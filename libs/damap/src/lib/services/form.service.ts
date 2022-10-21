import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Dmp } from '../domain/dmp';
import { Contributor } from '../domain/contributor';
import { Dataset } from '../domain/dataset';
import { Cost } from '../domain/cost';
import { DataAccessType } from '../domain/enum/data-access-type.enum';
import { Storage } from '../domain/storage';
import { AccessRight } from '../domain/enum/access-right.enum';
import { notEmptyValidator } from '../validators/not-empty.validator';
import { ExternalStorage } from '../domain/external-storage';
import { Repository } from '../domain/repository';
import { InternalStorage } from '../domain/internal-storage';
import { currencyValidator } from '../validators/currency.validator';
import { DataSource } from '../domain/enum/data-source.enum';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private TEXT_MAX_LENGTH = 4000;
  private TEXT_SHORT_LENGTH = 255;
  private readonly form: UntypedFormGroup;
  private readonly initialFormValue;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.form = this.createDmpForm();
    this.initialFormValue = this.form.getRawValue();
  }

  get dmpForm(): UntypedFormGroup {
    return this.form;
  }

  public static restrictedDatasets(datasets: Dataset[]): boolean {
    return datasets.find(item => item.dataAccess === DataAccessType.RESTRICTED) != null;
  }

  public static closedDatasets(datasets: Dataset[]): boolean {
    return datasets.find(item => item.dataAccess === DataAccessType.CLOSED) != null;
  }

  private createDmpForm(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null],
      project: [null],
      contributors: this.formBuilder.array([]),
      data: this.formBuilder.group({
        kind: [null],
        explanation: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        reusedKind: [null],
        dataGeneration: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)]
      }),
      datasets: this.formBuilder.array([]),
      documentation: this.formBuilder.group({
        metadata: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        structure: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        documentation: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        dataQuality: [[]],
        otherDataQuality: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)]
      }),
      storage: this.formBuilder.array([]),
      externalStorage: this.formBuilder.array([]),
      externalStorageInfo: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      legal: this.formBuilder.group({
        personalData: [false],
        personalDataCris: [null],
        personalDataCompliance: [[]],
        otherPersonalDataCompliance: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        sensitiveData: [false],
        sensitiveDataCris: [null],
        sensitiveDataSecurity: [[]],
        otherDataSecurityMeasures: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        sensitiveDataAccess: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        legalRestrictions: [false],
        legalRestrictionsCris: [null],
        legalRestrictionsDocuments: [[]],
        otherLegalRestrictionsDocuments: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        legalRestrictionsComment: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        dataRightsAndAccessControl: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        humanParticipants: [false],
        humanParticipantsCris: [null],
        ethicalIssues: [false],
        ethicalIssuesCris: [null],
        committeeReviewed: [false],
        committeeReviewedCris: [null]
      }),
      repositories: this.formBuilder.array([]),
      reuse: this.formBuilder.group({
        targetAudience: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        tools: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        restrictedDataAccess: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)]
      }),
      restrictedAccessInfo: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      closedAccessInfo: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      costs: this.formBuilder.group({
        exist: [null],
        existCris: [null],
        list: this.formBuilder.array([])
      })
    });
  }

  public mapDmpToForm(dmp: Dmp) {

    this.resetForm();
    this.form.patchValue({
      id: dmp.id,
      project: dmp.project,
      data: {
        kind: dmp.dataKind,
        reusedKind: dmp.reusedDataKind,
        explanation: dmp.noDataExplanation,
        dataGeneration: dmp.dataGeneration
      },
      documentation: {
        metadata: dmp.metadata,
        structure: dmp.structure,
        documentation: dmp.documentation,
        dataQuality: dmp.dataQuality,
        otherDataQuality: dmp.otherDataQuality
      },
      externalStorageInfo: dmp.externalStorageInfo,
      legal: {
        personalData: dmp.personalData,
        personalDataCris: dmp.personalDataCris,
        personalDataCompliance: dmp.personalDataCompliance,
        otherPersonalDataCompliance: dmp.otherPersonalDataCompliance,
        sensitiveData: dmp.sensitiveData,
        sensitiveDataCris: dmp.sensitiveDataCris,
        sensitiveDataSecurity: dmp.sensitiveDataSecurity,
        otherDataSecurityMeasures: dmp.otherDataSecurityMeasures,
        sensitiveDataAccess: dmp.sensitiveDataAccess,
        legalRestrictions: dmp.legalRestrictions,
        legalRestrictionsCris: dmp.legalRestrictionsCris,
        legalRestrictionsDocuments: dmp.legalRestrictionsDocuments,
        otherLegalRestrictionsDocuments: dmp.otherLegalRestrictionsDocument,
        legalRestrictionsComment: dmp.legalRestrictionsComment,
        dataRightsAndAccessControl: dmp.dataRightsAndAccessControl,
        humanParticipants: dmp.humanParticipants,
        humanParticipantsCris: dmp.humanParticipantsCris,
        ethicalIssues: dmp.ethicalIssuesExist,
        ethicalIssuesCris: dmp.ethicalIssuesExistCris,
        committeeReviewed: dmp.committeeReviewed,
        committeeReviewedCris: dmp.committeeReviewedCris
      },
      reuse: {
        targetAudience: dmp.targetAudience,
        tools: dmp.tools,
        restrictedDataAccess: dmp.restrictedDataAccess
      },
      costs: {
        exist: dmp.costsExist,
        existCris: dmp.costsExistCris
      },
      restrictedAccessInfo: dmp.restrictedAccessInfo,
      closedAccessInfo: dmp.closedAccessInfo
    });

    // Contributors, datasets, repositories, costs
    if (dmp.contributors) {
      for (const contributor of dmp.contributors) {
        (this.form.controls['contributors'] as UntypedFormArray).push(this.mapContributorToFormGroup(contributor));
      }
    }
    if (dmp.datasets) {
      for (const dataset of dmp.datasets) {
        (this.form.controls['datasets'] as UntypedFormArray).push(this.mapDatasetToFormGroup(dataset));
      }
    }
    if (dmp.repositories) {
      for (const repo of dmp.repositories) {
        (this.form.controls['repositories'] as UntypedFormArray).push(this.mapRepositoryToFormGroup(repo));
      }
    }
    if (dmp.costs) {
      for (const cost of dmp.costs) {
        (this.form.controls['costs'].get('list') as UntypedFormArray).push(this.mapCostToFormGroup(cost));
      }
    }
    if (dmp.storage) {
      for (const storage of dmp.storage) {
        (this.form.controls['storage'] as UntypedFormArray).push(this.mapStorageToFormGroup(storage));
      }
    }
    if (dmp.externalStorage) {
      for (const externalStorage of dmp.externalStorage) {
        (this.form.controls['externalStorage'] as UntypedFormArray).push(this.mapExternalStorageToFormGroup(externalStorage));
      }
    }
  }

  public exportFormToDmp(): Dmp {
    const formValue = this.form.getRawValue();

    return {
      closedAccessInfo: formValue.closedAccessInfo,
      committeeReviewed: formValue.legal.committeeReviewed,
      committeeReviewedCris: formValue.legal.committeeReviewedCris,
      contributors: formValue.contributors,
      costs: formValue.costs.exist ? formValue.costs.list : [],
      costsExist: formValue.costs.exist,
      costsExistCris: formValue.costs.existCris,
      dataGeneration: formValue.data.dataGeneration,
      dataKind: formValue.data.kind,
      reusedDataKind: formValue.data.reusedKind,
      dataQuality: formValue.documentation.dataQuality || [],
      documentation: formValue.documentation.documentation,
      datasets: formValue.datasets,
      ethicalIssuesExist: formValue.legal.ethicalIssues,
      ethicalIssuesExistCris: formValue.legal.ethicalIssuesCris,
      externalStorage: formValue.externalStorage,
      externalStorageInfo: formValue.externalStorageInfo,
      repositories: formValue.repositories,
      humanParticipants: formValue.legal.humanParticipants,
      humanParticipantsCris: formValue.legal.humanParticipantsCris,
      legalRestrictions: formValue.legal.legalRestrictions,
      legalRestrictionsCris: formValue.legal.legalRestrictionsCris,
      legalRestrictionsDocuments: formValue.legal.legalRestrictionsDocuments || [],
      otherLegalRestrictionsDocument: formValue.legal.otherLegalRestrictionsDocuments,
      legalRestrictionsComment: formValue.legal.legalRestrictionsComment,
      dataRightsAndAccessControl: formValue.legal.dataRightsAndAccessControl,
      metadata: formValue.documentation.metadata,
      noDataExplanation: formValue.data.explanation,
      otherDataQuality: formValue.documentation.otherDataQuality,
      otherPersonalDataCompliance: formValue.legal.otherPersonalDataCompliance,
      personalData: formValue.legal.personalData,
      personalDataCris: formValue.legal.personalDataCris,
      personalDataCompliance: formValue.legal.personalDataCompliance || [],
      restrictedAccessInfo: formValue.restrictedAccessInfo,
      restrictedDataAccess: formValue.reuse.restrictedDataAccess,
      sensitiveData: formValue.legal.sensitiveData,
      sensitiveDataCris: formValue.legal.sensitiveDataCris,
      sensitiveDataSecurity: formValue.legal.sensitiveDataSecurity || [],
      otherDataSecurityMeasures: formValue.legal.otherDataSecurityMeasures,
      sensitiveDataAccess: formValue.legal.sensitiveDataAccess,
      storage: formValue.storage,
      structure: formValue.documentation.structure,
      targetAudience: formValue.reuse.targetAudience,
      tools: formValue.reuse.tools,
      id: formValue.id,
      project: formValue.project
    };
  }

  public resetForm(): void {
    this.form.reset();
    (this.form.controls['contributors'] as UntypedFormArray).clear();
    (this.form.controls['datasets'] as UntypedFormArray).clear();
    (this.form.controls['repositories'] as UntypedFormArray).clear();
    (this.form.controls['costs'].get('list') as UntypedFormArray).clear();
    (this.form.controls['storage'] as UntypedFormArray).clear();
    (this.form.controls['externalStorage'] as UntypedFormArray).clear();

    this.form.setValue(this.initialFormValue);
  }

  public changeContactPerson(contact: Contributor) {
    // Remove old contact
    const contributorFormArray = this.form.get('contributors') as UntypedFormArray;
    contributorFormArray.controls.forEach(c => c.patchValue({ contact: false }));

    // Add/set new contact
    if (contact) {
      const newContact = contributorFormArray.controls.find(c => c.value.universityId === contact.universityId);
      if (newContact) {
        newContact.patchValue({ contact: true });
      } else {
        this.addContributorToForm(contact, true);
      }
    }
  }

  public addContributorToForm(contributor: Contributor, contact = false) {
    const contributorFormGroup = this.createContributorFormGroup();
    contributorFormGroup.patchValue(contributor);
    contributorFormGroup.patchValue({ contact });
    (this.form.get('contributors') as UntypedFormArray).push(contributorFormGroup);
  }

  public removeContributorFromForm(index: number) {
    (this.form.get('contributors') as UntypedFormArray).removeAt(index);
  }

  public addDatasetToForm(reference: string, title: string) {
    const formGroup = this.createDatasetFormGroup(title);
    formGroup.patchValue({
      referenceHash: reference,
      startDate: this.form.value.project?.end || null,
      dateOfDeletion: this.form.value.project?.end || null
    });
    (this.form.get('datasets') as UntypedFormArray).push(formGroup);
  }

  public addReusedDatasetToForm(dataset: Dataset) {
    const formGroup = this.createDatasetFormGroup('Reused dataset');
    formGroup.patchValue(dataset);
    (this.form.get('datasets') as UntypedFormArray).push(formGroup);
  }

  public updateDatasetOfForm(index: number, update: Dataset) {
    const dataset = (this.form.get('datasets') as UntypedFormArray).at(index);
    dataset.patchValue(update);
  }

  public removeDatasetFromForm(index: number) {
    this.removeDatasetReferences(index);
    (this.form.get('datasets') as UntypedFormArray).removeAt(index);
  }

  public addFileAnalysisAsDatasetToForm(dataset: Dataset) {
    const formGroup = this.mapDatasetToFormGroup(dataset);
    formGroup.patchValue({
      startDate: this.form.value.project?.end || null
    });
    (this.form.get('datasets') as UntypedFormArray).push(formGroup);
  }

  public addStorageToForm(storage: InternalStorage) {
    const storageFormGroup = this.createStorageFormGroup();
    storageFormGroup.patchValue({ internalStorageId: storage.id, title: storage.title });
    (this.form.get('storage') as UntypedFormArray).push(storageFormGroup);
  }

  public removeStorageFromForm(index: number) {
    (this.form.get('storage') as UntypedFormArray).removeAt(index);
  }

  public addExternalStorageToForm() {
    const externalStorageFormGroup = this.createExternalStorageFormGroup();
    const storage = this.form.get('externalStorage') as UntypedFormArray;
    storage.push(externalStorageFormGroup);
  }

  public removeExternalStorageFromForm(index: number) {
    const storage = this.form.get('externalStorage') as UntypedFormArray;
    storage.removeAt(index);
  }

  public addRepositoryToForm(repo: { id: string, name: string }) {
    const repoFormGroup = this.createRepositoryFormGroup();
    repoFormGroup.patchValue({
      repositoryId: repo.id,
      title: repo.name
    });
    (this.form.get('repositories') as UntypedFormArray).push(repoFormGroup);
  }

  public removeRepositoryFromForm(index: number) {
    (this.form.get('repositories') as UntypedFormArray).removeAt(index);
  }

  public addCostToForm() {
    const costFormGroup: UntypedFormGroup = this.createCostFormGroup();
    ((this.form.get('costs') as UntypedFormGroup).get('list') as UntypedFormArray).push(costFormGroup);
  }

  public removeCostFromForm(index: number) {
    ((this.form.get('costs') as UntypedFormGroup).get('list') as UntypedFormArray).removeAt(index);
  }

  public createDatasetFormGroup(title: string): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null, { disabled: true }],
      title: [title, [Validators.required, Validators.maxLength(this.TEXT_SHORT_LENGTH), notEmptyValidator()]],
      license: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      startDate: [null],
      type: [[]],
      size: [null],
      description: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      personalData: [false],
      sensitiveData: [false],
      legalRestrictions: [false],
      dataAccess: [DataAccessType.OPEN],
      referenceHash: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      selectedProjectMembersAccess: [AccessRight.WRITE],
      otherProjectMembersAccess: [AccessRight.WRITE],
      publicAccess: [AccessRight.READ],
      delete: [false],
      dateOfDeletion: [null],
      reasonForDeletion: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      deletionPerson: [null],
      retentionPeriod: [null],
      source: [DataSource.NEW, Validators.required],
      datasetId: [null]
    });
  }

  private mapDatasetToFormGroup(dataset: Dataset): UntypedFormGroup {
    const formGroup = this.createDatasetFormGroup(dataset.title);
    formGroup.patchValue(dataset);
    return formGroup;
  }

  private createContributorFormGroup(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null, { disabled: true }],
      affiliation: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      affiliationId: [null],
      contact: [false],
      firstName: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      lastName: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      mbox: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      personId: [null],
      role: [null],
      roleInProject: [''],
      universityId: [null]
    });
  }

  private mapContributorToFormGroup(contributor: Contributor): UntypedFormGroup {
    const formGroup = this.createContributorFormGroup();
    formGroup.patchValue(contributor);
    return formGroup;
  }

  private createStorageFormGroup(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null, { disabled: true }],
      internalStorageId: [null, { disabled: true }],
      title: ['', [Validators.required, Validators.maxLength(this.TEXT_SHORT_LENGTH), notEmptyValidator()]],
      datasets: [[]]
    });
  }

  private mapStorageToFormGroup(storage: Storage): UntypedFormGroup {
    const formGroup = this.createStorageFormGroup();
    formGroup.patchValue({
      id: storage.id,
      internalStorageId: storage.internalStorageId,
      title: storage.title,
      datasets: storage.datasets || []
    });
    return formGroup;
  }

  private createExternalStorageFormGroup(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null, { disabled: true }],
      title: ['Other', [Validators.required, Validators.maxLength(this.TEXT_SHORT_LENGTH), notEmptyValidator()]],
      url: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      storageLocation: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      backupLocation: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      backupFrequency: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      datasets: [[]]
    });
  }

  private mapExternalStorageToFormGroup(externalStorage: ExternalStorage): UntypedFormGroup {
    const formGroup = this.createExternalStorageFormGroup();
    formGroup.setValue({
      id: externalStorage.id,
      title: externalStorage.title,
      url: externalStorage.url || null,
      storageLocation: externalStorage.storageLocation || null,
      backupLocation: externalStorage.backupLocation || null,
      backupFrequency: externalStorage.backupFrequency || null,
      datasets: externalStorage.datasets || []
    });
    return formGroup;
  }

  private createRepositoryFormGroup(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null, { disabled: true }],
      repositoryId: [null],
      title: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      datasets: [[]]
    });
  }

  private mapRepositoryToFormGroup(repo: Repository): UntypedFormGroup {
    const formGroup = this.createRepositoryFormGroup();
    formGroup.patchValue({
      id: repo.id,
      repositoryId: repo.repositoryId,
      title: repo.title || '',
      datasets: repo.datasets || []
    });
    return formGroup;
  }

  private createCostFormGroup(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null, { disabled: true }],
      title: ['New cost', [Validators.required, Validators.maxLength(this.TEXT_SHORT_LENGTH), notEmptyValidator()]],
      currencyCode: ['EUR', [Validators.required, Validators.maxLength(this.TEXT_SHORT_LENGTH)]],
      value: [0, currencyValidator()], // validate currency format
      type: [null],
      customType: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      description: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)]
    });
  }

  private mapCostToFormGroup(cost: Cost): UntypedFormGroup {
    const formGroup = this.createCostFormGroup();
    formGroup.setValue({
      id: cost.id || null,
      title: cost.title,
      currencyCode: cost.currencyCode || 'EUR',
      value: cost.value,
      type: cost.type || null,
      customType: cost.customType || '',
      description: cost.description || ''
    });
    return formGroup;
  }

  private removeDatasetReferences(index: number) {
    const dataset = (this.form.get('datasets') as UntypedFormArray).at(index) as UntypedFormGroup;

    // Storage
    const storageStep = this.form.get('storage') as UntypedFormArray;
    this.removeDatasetReferenceInFormArray(storageStep, dataset);

    // External Storage
    const eStorageStep = this.form.get('externalStorage') as UntypedFormArray;
    this.removeDatasetReferenceInFormArray(eStorageStep, dataset);

    // Repositories
    const repoStep = this.form.get('repositories') as UntypedFormArray;
    this.removeDatasetReferenceInFormArray(repoStep, dataset);
  }

  private removeDatasetReferenceInFormArray(array: UntypedFormArray, dataset: UntypedFormGroup) {
    for (let i = 0; i < array.controls?.length; i++) {
      const item = array.at(i);
      const datasets = item.value.datasets.filter(entry => entry !== dataset.value.referenceHash);
      item.patchValue({ datasets });
    }
  }
}
