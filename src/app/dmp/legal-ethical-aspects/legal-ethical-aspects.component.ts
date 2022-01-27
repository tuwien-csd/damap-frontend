import {Component, Input} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ComplianceType} from '../../domain/enum/compliance-type.enum';
import {SecurityMeasure} from '../../domain/enum/security-measure.enum';
import {Agreement} from '../../domain/enum/agreement.enum';

@Component({
  selector: 'app-dmp-legal-ethical-aspects',
  templateUrl: './legal-ethical-aspects.component.html',
  styleUrls: ['./legal-ethical-aspects.component.css']
})
export class LegalEthicalAspectsComponent {

  @Input() dmpForm: FormGroup;
  @Input() legalEthicalStep: FormGroup;
  @Input() datasets: FormArray;

  optionsLinksEthics: string[] = ['Guidelines on Safeguarding Good Scientific Practice'];

  questions = [
    {label: 'dmp.steps.legal.question.personalData', model: 'personalData'},
    {label: 'dmp.steps.legal.question.legalRestrictions', model: 'legalRestrictions'}
  ];

  complianceOptions: any = ComplianceType;
  securityOptions: any = SecurityMeasure;
  agreementOptions: any = Agreement;

  originalOrder = (): number => 0;

  constructor() {
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
    return this.legalEthicalStep?.controls.personalDataCompliance?.value.includes(ComplianceType.OTHER);
  }

  get isOtherMeasureSelected() {
    return this.legalEthicalStep.controls.sensitiveDataSecurity.value?.includes(SecurityMeasure.OTHER);
  }

  get isOtherDocumentSelected() {
    return this.legalEthicalStep.controls.legalRestrictionsDocuments.value?.includes(Agreement.OTHER);
  }

}
