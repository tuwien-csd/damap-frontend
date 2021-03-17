import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dmp-legal-ethical-aspects',
  templateUrl: './legal-ethical-aspects.component.html',
  styleUrls: ['./legal-ethical-aspects.component.css']
})
export class LegalEthicalAspectsComponent implements OnInit {

  @Input() legalEthicalStep: FormGroup;

  questions = [
    {label: 'Will personal data be collected/used as part of the project?', model: 'personalInformation'},
    {label: 'Is your data or part of it sensitive, for example personal data, politically sensitive information, or trade secrets?', model: 'sensitiveData'},
    {label: 'Are there any other legal restrictions on how data is processed or shared?', model: 'legalRestrictions'},
    {label: 'Are there any ethical issues associated with your research data?', model: 'ethicalIssues'},
    {label: 'If so, was your plan to deal with these ethical issues approved by the ethics committee?',
      model: 'committeeApproved'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
