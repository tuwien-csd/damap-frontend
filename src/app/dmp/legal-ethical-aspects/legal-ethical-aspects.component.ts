import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
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

  get isOtherSelected() {
    return this.legalEthicalStep?.controls.personalDataCompliance?.value.includes(ComplianceType.Other);
  }

}
