import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Dmp} from '../domain/dmp';
import {Contributor} from '../domain/contributor';
import {Dataset} from '../domain/dataset';
import {Host} from '../domain/host';

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
      legal: {
        personalInformation: dmp.project,
        sensitiveData: dmp.sensitiveData,
        legalRestrictions: dmp.legalRestrictions,
        ethicalIssues: dmp.ethicalIssuesExist,
        committeeApproved: dmp.committeeApproved,
        ethicsReport: dmp.ethicsReport,
        optionalStatement: dmp.optionalStatement,
      }
    });

    // Contributors, datasets, hosts
    for (const contributor of dmp.contributors) {
      (form.controls.contributors as FormArray).push(new FormControl(contributor));
    }
    for (const dataset of dmp.datasets) {
      (form.controls.datasets as FormArray).push(this.mapDatasetToFormGroup(dataset));
    }
    for (const host of dmp.hosts) {
      (form.controls.hosts as FormArray).push(this.mapHostToFormGroup(host));
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
      targetAudience: formValue.documentation.targetAudience,
      personalInformation: formValue.legal.personalInformation,
      sensitiveData: formValue.legal.sensitiveData,
      legalRestrictions: formValue.legal.legalRestrictions,
      ethicalIssuesExist: formValue.legal.ethicalIssues,
      committeeApproved: formValue.legal.committeeApproved,
      ethicsReport: formValue.legal.ethicsReport,
      optionalStatement: formValue.legal.optionalStatement,
      hosts
    };
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
      name: [''],
      date: [null],
      datasets: ['']
    });
  }

  private mapHostToFormGroup(host: Host): FormGroup {
    const formGroup = this.createHostFormGroup();
    formGroup.patchValue({
      id: host.id,
      name: host.name || '',
      date: host.date || null,
      datasets: host.datasets
    });
    return formGroup;
  }
}