import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ComplianceType} from '../../domain/enum/compliance-type.enum';

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
    {label: 'Are there any other legal restrictions on how data is processed or shared?', model: 'legalRestrictions'},
    {label: 'Are there any ethical issues associated with your research data?', model: 'ethicalIssues'}
  ];

  complianceOptions: any = ComplianceType;

  originalOrder = (): number => 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  get personalDataAccess(): FormControl {
    return this.legalEthicalStep?.get('personalDataAccess') as FormControl;
  }

  get otherPersonalDataCompliance(): FormControl {
    return this.legalEthicalStep?.get('otherPersonalDataCompliance') as FormControl;
  }

  get sensitiveDataSecurity(): FormControl {
    return this.legalEthicalStep?.get('sensitiveDataSecurity') as FormControl;
  }

  get legalRestrictionsComment(): FormControl {
    return this.legalEthicalStep?.get('legalRestrictionsComment') as FormControl;
  }

  get ethicsReport(): FormControl {
    return this.legalEthicalStep?.get('ethicsReport') as FormControl;
  }

  get ethicalComplianceStatement(): FormControl {
    return this.legalEthicalStep?.get('ethicalComplianceStatement') as FormControl;
  }

  get isOtherSelected() {
    return this.legalEthicalStep?.controls.personalDataCompliance?.value.includes(ComplianceType.Other);
  }

}
