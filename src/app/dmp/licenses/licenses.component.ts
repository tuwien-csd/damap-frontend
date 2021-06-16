import {Component, Input, OnInit} from '@angular/core';
import {FormArray} from '@angular/forms';
import {License} from '../../domain/license';
import {LicenseDefinitions} from '../../widgets/license-wizard/license-wizard-list';

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

  setLicenseSelectorResult(event, index: number) {
    const dataset = this.datasets.at(index);
    dataset.patchValue({license: event.url});
  }
}
