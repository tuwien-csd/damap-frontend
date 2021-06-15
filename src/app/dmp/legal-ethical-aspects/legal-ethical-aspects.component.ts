import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';

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
    {label: 'Will personal data be collected/used as part of the project?', model: 'personalData'},
    {label: 'Is your data or part of it sensitive, for example personal data, politically sensitive information, or trade secrets?',
      model: 'sensitiveData'},
    {label: 'Are there any other legal restrictions on how data is processed or shared?', model: 'legalRestrictions'},
    {label: 'Are there any ethical issues associated with your research data?', model: 'ethicalIssues'},
    // {label: 'Was your plan to deal with these ethical issues approved by the ethics committee?', model: 'committeeApproved'}
  ];

  complianceOptions: Array<any> = [
    {label: 'by gaining informed consent', value: 'by gaining informed consent'},
    {label: 'by encryption', value: 'by encryption'},
    {label: 'by anonymisation', value: 'by anonymisation'},
    {label: 'by pseudonymisation', value: 'by pseudonymisation'},
    {label: 'others', value: 'others'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  get isOthersSelected() {
    return ((this.legalEthicalStep.controls.personalDataCompliance?.value) as Array<string>)?.find(item => item === 'others') != null;
  }

}
