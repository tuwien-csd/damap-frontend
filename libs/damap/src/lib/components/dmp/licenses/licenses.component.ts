import { Component, Input } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';

import { ComplianceType } from '../../../domain/enum/compliance-type.enum';
import { DataAccessType } from '../../../domain/enum/data-access-type.enum';
import { DataSource } from '../../../domain/enum/data-source.enum';
import { License } from '../../../domain/license';
import { LicenseDefinitions } from '../../../widgets/license-wizard/license-wizard-list';

@Component({
  selector: 'app-dmp-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css'],
})
export class LicensesComponent {
  @Input() dmpForm: UntypedFormGroup;
  @Input() datasets: UntypedFormArray;
  @Input() licenseUrl$: string;

  licenses: License[] = LicenseDefinitions;
  accessType: any = DataAccessType;

  translateEnumPrefix = 'enum.dataaccess.';
  defaultLicense = 'https://creativecommons.org/licenses/by/4.0/';

  readonly datasetSource: any = DataSource;

  onChangeLicense($event) {
    this.licenseUrl$ = $event.value;
  }

  setLicenseSelectorResult(event, index: number) {
    const dataset = this.datasets.at(index);
    if (event) {
      dataset.patchValue({ license: event.url });
    }
  }

  get isAnonymisedOrPseudonymised() {
    return (
      this.dmpForm?.value.legal.personalDataCompliance?.includes(
        ComplianceType.ANONYMISATION
      ) ||
      this.dmpForm?.value.legal.personalDataCompliance?.includes(
        ComplianceType.PSEUDONYMISATION
      )
    );
  }

  get restricted() {
    return this.datasets?.value.filter(
      (item) =>
        item.dataAccess === DataAccessType.RESTRICTED &&
        item.source === DataSource.NEW
    );
  }

  get closed() {
    return this.datasets?.value.filter(
      (item) =>
        item.dataAccess === DataAccessType.CLOSED &&
        item.source === DataSource.NEW
    );
  }

  getFormGroup(index: number): UntypedFormGroup {
    return this.datasets.at(index) as UntypedFormGroup;
  }
}
