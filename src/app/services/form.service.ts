import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
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
  }

  public mapDmpToForm(dmp: Dmp): FormGroup {
    const form = this.createDmpForm();
    return form;
  }

  public mapFormToDmp(form: FormGroup): Dmp {
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
      datakind: formValue.data.datakind,
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
}
