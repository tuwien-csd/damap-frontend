import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dmp-legal-ethical-aspects',
  templateUrl: './legal-ethical-aspects.component.html',
  styleUrls: ['./legal-ethical-aspects.component.css']
})
export class LegalEthicalAspectsComponent implements OnInit {

  @Input() dmpForm: FormGroup;

  legalEthicalStep: FormGroup;

  questions = [
    {label: 'Does your data contain personal information?', model: 'personalInformation'},
    {label: 'Is your data sensitive?', model: 'sensitiveData'},
    {label: 'Are there any other legal restrictions on how data is processed or shared?', model: 'legalRestrictions'},
    {label: 'Are there any ethical issues associated with your research data?', model: 'ethicalIssues'},
    {label: 'If so, was your plan to deal with these ethical issues approved by the ethics committee?',
      model: 'committeeApproved'},
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.legalEthicalStep = this.dmpForm.get('legal') as FormGroup;
  }

}
