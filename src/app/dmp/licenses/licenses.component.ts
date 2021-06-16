import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {License} from '../../domain/license';
import {LicenseDefinitions} from '../../widgets/license-wizard/license-wizard-list';
import {DataAccessType} from '../../domain/enum/data-access-type.enum';

@Component({
  selector: 'app-dmp-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css'],
})

export class LicensesComponent implements OnInit {

  @Input() dmpForm: FormGroup;
  @Input() datasets: FormArray;

  licenses: License[] = LicenseDefinitions;
  accessType: any = DataAccessType;

  constructor() { }

  ngOnInit(): void {
  }

  setLicenseSelectorResult(event, index: number) {
    const dataset = this.datasets.at(index);
    dataset.patchValue({license: event.url});
  }

  get restricted() {
    return this.datasets?.value.filter(item => item.dataAccess === DataAccessType.restricted);
  }

  get closed() {
    return this.datasets?.value.filter(item => item.dataAccess === DataAccessType.closed);
  }
}
