import {Component, Input} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {License} from '../../domain/license';
import {LicenseDefinitions} from '../../widgets/license-wizard/license-wizard-list';
import {DataAccessType} from '../../domain/enum/data-access-type.enum';
import {ComplianceType} from '../../domain/enum/compliance-type.enum';

@Component({
  selector: 'app-dmp-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css'],
})

export class LicensesComponent {

  @Input() dmpForm: FormGroup;
  @Input() datasets: FormArray;

  licenses: License[] = LicenseDefinitions;
  accessType: any = DataAccessType;

  translateEnumPrefix = 'enum.dataaccess.'

  constructor() {
  }

  setLicenseSelectorResult(event, index: number) {
    const dataset = this.datasets.at(index);
    if (event) {
      dataset.patchValue({license: event.url});
    }
  }

  get isAnonymisedOrPseudonymised() {
    return this.dmpForm?.value.legal.personalDataCompliance?.includes(ComplianceType.ANONYMISATION) ||
      this.dmpForm?.value.legal.personalDataCompliance?.includes(ComplianceType.PSEUDONYMISATION);
  }

  get restricted() {
    return this.datasets?.value.filter(item => item.dataAccess === DataAccessType.RESTRICTED);
  }

  get closed() {
    return this.datasets?.value.filter(item => item.dataAccess === DataAccessType.CLOSED);
  }

  getFormGroup(index: number): FormGroup {
    return this.datasets.at(index) as FormGroup;
  }
}
