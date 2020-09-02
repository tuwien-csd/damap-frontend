import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dmp-legal-ethical-aspects',
  templateUrl: './legal-ethical-aspects.component.html',
  styleUrls: ['./legal-ethical-aspects.component.css']
})
export class LegalEthicalAspectsComponent implements OnInit {

  //

  legalEthicalAspectsFormGroup = new FormGroup(
    {
      'personalInformation': new FormControl(),
      'sensitiveData': new FormControl(),
      'legalRestrictions': new FormControl(),
      'ethicalIssues': new FormControl(),
      'committeeApproved': new FormControl(),
      'ethicsReport': new FormControl(),
      'optionalStatement': new FormControl(),
    }
  );


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

  ngOnInit()
    :
    void {
  }

// fixme
  showValue(value : boolean) {
    console.log("Value: " + value);
  }

  updateValue(key: string, value: boolean) {
    console.log(key);
    console.log(this.legalEthicalAspectsFormGroup.controls[key]);

    this.legalEthicalAspectsFormGroup.controls[key].setValue(value);
  }

}
