import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ComplianceType} from '../../domain/enum/compliance-type.enum';
import {SecurityMeasure} from '../../domain/enum/security-measure';
import {Agreement} from '../../domain/enum/agreement';

@Component({
  selector: 'app-dmp-legal-ethical-aspects',
  templateUrl: './legal-ethical-aspects.component.html',
  styleUrls: ['./legal-ethical-aspects.component.css']
})
export class LegalEthicalAspectsComponent implements OnInit {

  @Input() dmpForm: FormGroup;
  @Input() legalEthicalStep: FormGroup;
  @Input() datasets: FormArray;

  optionsLinksEthics: string[] = ['Guidelines on Safeguarding Good Scientific Practice'];

  questions = [
    {
      label: 'Is your data or part of it sensitive, for example personal data, politically sensitive information, or trade secrets?',
      model: 'sensitiveData'
    },
    {label: 'Will personal data be collected/used as part of the project?', model: 'personalData'},
    {label: 'Are there any other legal restrictions on how data is processed or shared?', model: 'legalRestrictions'}
  ];

  complianceOptions: any = ComplianceType;
  securityOptions: any = SecurityMeasure;
  agreementOptions: any = Agreement;

  originalOrder = (): number => 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  get sensitiveDataAccess(): FormControl {
    return this.legalEthicalStep.get('sensitiveDataAccess') as FormControl;
  }

  get otherPersonalDataCompliance(): FormControl {
    return this.legalEthicalStep?.get('otherPersonalDataCompliance') as FormControl;
  }

  get otherDataSecurityMeasures(): FormControl {
    return this.legalEthicalStep.get('otherDataSecurityMeasures') as FormControl;
  }

  get legalRestrictionsComment(): FormControl {
    return this.legalEthicalStep?.get('legalRestrictionsComment') as FormControl;
  }

  get otherLegalRestrictionsDocuments(): FormControl {
    return this.legalEthicalStep.get('otherLegalRestrictionsDocuments') as FormControl;
  }

  get dataRightsAndAccessControl(): FormControl {
    return this.legalEthicalStep.get('dataRightsAndAccessControl') as FormControl;
  }

  get isOtherSelected() {
    return this.legalEthicalStep?.controls.personalDataCompliance?.value.includes(ComplianceType.Other);
  }

  get isOtherMeasureSelected() {
    return this.legalEthicalStep.controls.sensitiveDataSecurity.value?.includes(SecurityMeasure.OTHER);
  }

  get isOtherDocumentSelected() {
    return this.legalEthicalStep.controls.legalRestrictionsDocuments.value?.includes(Agreement.OTHER);
  }

}
