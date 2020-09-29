import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";

interface License {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dmp-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css'],
})

export class LicensesComponent implements OnInit {

  @Input() dmpForm: FormGroup;

  licenses: License[] = [
    {value: 'license-0', viewValue: 'License 1'},
    {value: 'license-1', viewValue: 'License 2'},
    {value: 'license-2', viewValue: 'License 3'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  get datasets() {
    const data = this.dmpForm.get('data') as FormGroup;
    return data.get('datasets') as FormArray;
  }

}
