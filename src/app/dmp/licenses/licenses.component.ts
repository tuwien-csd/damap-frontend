import {Component, Input, OnInit} from '@angular/core';
import {FormArray} from '@angular/forms';
import {LicenseDefinitions} from './license-list';
import {License} from '../../domain/license';

@Component({
  selector: 'app-dmp-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css'],
})

export class LicensesComponent implements OnInit {

  @Input() datasets: FormArray;

  licenses: License[] = LicenseDefinitions;

  constructor() { }

  ngOnInit(): void {
  }

  setLicenseSelectorResult($event, index: number) {
    console.log($event);
    const dataset = this.datasets.at(index);
    dataset.patchValue({license: $event});
  }
}
