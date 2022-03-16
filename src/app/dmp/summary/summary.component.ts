import {Component, OnInit} from '@angular/core';
import {DataKind} from '../../domain/enum/data-kind.enum';
import {DataAccessType} from '../../domain/enum/data-access-type.enum';
import {Dmp} from '../../domain/dmp';
import {select, Store} from '@ngrx/store';
import {selectForm, selectFormContact} from '../../store/selectors/form.selectors';
import {Observable} from 'rxjs';
import {AppState} from '../../store/states/app.state';
import {SecurityMeasure} from '../../domain/enum/security-measure.enum';
import {ComplianceType} from '../../domain/enum/compliance-type.enum';
import {Agreement} from '../../domain/enum/agreement.enum';
import {Contributor} from '../../domain/contributor';

export interface Completeness {
  step: string;
  completeness: number; // 0 - 100
  status: string[];
}

@Component({
  selector: 'app-dmp-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(public store: Store<AppState>) {
  }

  get datasets() {
    return this.dmpForm.datasets;
  }

  form$: Observable<Dmp>;
  dmpForm: Dmp;
  dataSource;
  contact: Contributor;

  readonly summaryTableHeaders: string[] = ['step', 'completeness', 'status'];

  // Get all datasets assigned to any of the form array groups (storage/repository) without duplicates
  // To check if a storage/repository is provided for all datasets
  private static getFormArrayDatasets(array: any[]): string[] {
    if (!array) return [];
    const datasetsInArray: string[] = [];
    for (const entry of array) {
      const datasets = entry.datasets;
      if (datasets) {
        for (const item of datasets) {
          const index = datasetsInArray.indexOf(item);
          if (index < 0) {
            datasetsInArray.push(item);
          }
        }
      }
    }
    return datasetsInArray;
  }

  ngOnInit(): void {
    this.store.pipe(select(selectFormContact)).subscribe(val => this.contact = val);
    this.form$ = this.store.pipe(select(selectForm));
    this.form$.subscribe(value => {
      if (value) {
        this.dmpForm = value;
        this.evaluateCompleteness();
      }
    });
  }

  private evaluateCompleteness() {
    this.dataSource = [];

    // General properties
    const restrictedDatasets = this.datasets.find(item => item.dataAccess === DataAccessType.RESTRICTED) != null;
    const closedDatasets = this.datasets.find(item => item.dataAccess === DataAccessType.CLOSED) != null;

    // Select project
    const projectsLevel: Completeness = {step: 'dmp.steps.project.label', completeness: 0, status: []};
    if (!this.dmpForm.project) {
      projectsLevel.completeness = 0;
      projectsLevel.status.push('dmp.steps.summary.project.none');
    } else {
      projectsLevel.completeness = 100;
      projectsLevel.status.push(`Project: ${this.dmpForm.project.title}.`);
    }

    // People involved
    const peopleLevel: Completeness = {step: 'dmp.steps.people.label', completeness: 0, status: []};
    if (this.contact) {
      peopleLevel.completeness += 50;
      peopleLevel.status.push('dmp.steps.summary.people.contact.set');
    } else {
      peopleLevel.status.push('dmp.steps.summary.people.contact.missing');
    }
    if (this.dmpForm.contributors?.length === 0) {
      peopleLevel.completeness = 0;
      peopleLevel.status.push('dmp.steps.summary.people.contributor.none');
    } else {
      peopleLevel.completeness += 50;
      if (this.dmpForm.contributors.length === 1) {
        peopleLevel.status.push('dmp.steps.summary.people.contributor.one');
      } else {
        peopleLevel.status.push('dmp.steps.summary.people.contributor.multiple');
        peopleLevel.status.push(`${this.dmpForm.contributors.length}`);
      }
    }

    // Specify research data
    const specifyDataLevel: Completeness = {step: 'dmp.steps.data.specify.label', completeness: 0, status: []};
    if (this.dmpForm.dataKind === DataKind.SPECIFY) {
      specifyDataLevel.completeness = 100;
      if (this.dmpForm.datasets.length === 1) {
        specifyDataLevel.status.push('dmp.steps.summary.data.specify.datasets.one');
      } else {
        specifyDataLevel.status.push('dmp.steps.summary.data.specify.datasets.multiple');
        specifyDataLevel.status.push(`${this.dmpForm.datasets.length}`);
      }
    } else if (this.dmpForm.dataKind === DataKind.NONE) {
      specifyDataLevel.completeness = 50;
      specifyDataLevel.status.push('dmp.steps.summary.data.specify.datasets.nonespecified');
      if (this.dmpForm.noDataExplanation) {
        specifyDataLevel.completeness += 50;
      } else {
        specifyDataLevel.status.push('dmp.steps.summary.data.specify.datasets.missingexplanation');
      }
    } else {
      specifyDataLevel.completeness = 0;
      specifyDataLevel.status.push('dmp.steps.summary.data.specify.datasets.none');
    }

    // Documentation and data quality
    const docDataQualityLevel: Completeness = {step: 'dmp.steps.documentation.label', completeness: 0, status: []};
    const docPercent = 100 / 3; // 100%/number of questions
    if (this.dmpForm.metadata !== '') {
      docDataQualityLevel.completeness += docPercent;
    }
    if (this.dmpForm.dataGeneration !== '') {
      docDataQualityLevel.completeness += docPercent;
    }
    if (this.dmpForm.structure !== '') {
      docDataQualityLevel.completeness += docPercent;
    }
    if (docDataQualityLevel.completeness === 0) {
      docDataQualityLevel.status.push('dmp.steps.summary.noinfo');
    } else if (docDataQualityLevel.completeness === 100) {
      docDataQualityLevel.status.push('dmp.steps.summary.allinfo');
    } else {
      docDataQualityLevel.status.push('dmp.steps.summary.partially');
    }

    // Storage
    const storageLevel: Completeness = {step: 'dmp.steps.storage.label', completeness: 0, status: []};
    if (this.dmpForm.dataKind === DataKind.NONE) {
      storageLevel.completeness = 100;
      storageLevel.status.push('dmp.steps.summary.storage.nonestored');
    } else if (this.dmpForm.dataKind === DataKind.UNKNOWN) {
      storageLevel.completeness = 0;
      storageLevel.status.push('dmp.steps.summary.storage.nodata');
    } else {
      const storage = this.dmpForm.storage;
      const eStorage = this.dmpForm.externalStorage;
      const storageDatasets: string[] =
        [...new Set([...SummaryComponent.getFormArrayDatasets(storage), ...SummaryComponent.getFormArrayDatasets(eStorage)])];
      if (this.datasets.length <= storageDatasets.length) {
        storageLevel.completeness = 100;
        storageLevel.status.push('dmp.steps.summary.storage.alldata');
      } else if (storageDatasets.length === 0) {
        storageLevel.completeness = 0;
        storageLevel.status.push('dmp.steps.summary.noinfo');
      } else {
        storageLevel.completeness = 100 * (storageDatasets.length / this.datasets.length);
        storageLevel.status.push('dmp.steps.summary.someinfo');
      }
      if (eStorage.length && !this.dmpForm.externalStorageInfo) {
        storageLevel.completeness = storageLevel.completeness > 0 ? storageLevel.completeness * 0.5 : 0;
        storageLevel.status.push('dmp.steps.summary.storage.missingexplanation');
      }
    }

    // Legal & ethical aspects
    const legalEthicalAspectsLevel: Completeness = {
      step: 'dmp.steps.legal.label',
      completeness: 0,
      status: []
    };
    const legalPercent = 100 / 3;
    // Sensitive Data
    if (this.dmpForm.sensitiveData) {
      for (const item of this.datasets) {
        if (item.sensitiveData) {
          legalEthicalAspectsLevel.completeness += legalPercent / 3;
          break;
        }
      }
      if (this.dmpForm.sensitiveDataSecurity.length) {
        if ((this.dmpForm.sensitiveDataSecurity.includes(SecurityMeasure.OTHER) && this.dmpForm.otherDataSecurityMeasures)
          || !this.dmpForm.sensitiveDataSecurity.includes(SecurityMeasure.OTHER)) {
          legalEthicalAspectsLevel.completeness += legalPercent / 3;
        }
      }
      if (this.dmpForm.sensitiveDataAccess) {
        legalEthicalAspectsLevel.completeness += legalPercent / 3;
      }
    } else {
      legalEthicalAspectsLevel.completeness += legalPercent;
    }
    // Personal Data
    if (this.dmpForm.personalData) {
      for (const item of this.datasets) {
        if (item.personalData) {
          legalEthicalAspectsLevel.completeness += legalPercent / 2;
          break;
        }
      }
      if (this.dmpForm.personalDataCompliance.length) {
        if ((this.dmpForm.personalDataCompliance.includes(ComplianceType.OTHER) && this.dmpForm.otherPersonalDataCompliance)
          || !this.dmpForm.personalDataCompliance.includes(ComplianceType.OTHER)) {
          legalEthicalAspectsLevel.completeness += legalPercent / 2;
        }
      }
    } else {
      legalEthicalAspectsLevel.completeness += legalPercent;
    }
    // Legal Restrictions
    if (this.dmpForm.legalRestrictions) {
      for (const item of this.datasets) {
        if (item.legalRestrictions) {
          legalEthicalAspectsLevel.completeness += legalPercent / 3;
          break;
        }
      }
      if (this.dmpForm.legalRestrictionsDocuments.length) {
        if ((this.dmpForm.legalRestrictionsDocuments.includes(Agreement.OTHER) && this.dmpForm.otherLegalRestrictionsDocument)
          || !this.dmpForm.legalRestrictionsDocuments.includes(Agreement.OTHER)) {
          legalEthicalAspectsLevel.completeness += legalPercent / 3;
        }
      }
      if (this.dmpForm.legalRestrictionsComment && this.dmpForm.dataRightsAndAccessControl) {
        legalEthicalAspectsLevel.completeness += legalPercent / 3;
      }
    } else {
      legalEthicalAspectsLevel.completeness += legalPercent;
    }

    if (legalEthicalAspectsLevel.completeness === 0) {
      legalEthicalAspectsLevel.status.push('dmp.steps.summary.noinfo');
    } else if (legalEthicalAspectsLevel.completeness >= 100) {
      legalEthicalAspectsLevel.status.push('dmp.steps.summary.allinfo');
    } else {
      legalEthicalAspectsLevel.status.push('dmp.steps.summary.partially');
    }

    // Licensing
    const licensesLevel: Completeness = {step: 'dmp.steps.licensing.label', completeness: 0, status: []};
    if (this.dmpForm.dataKind === DataKind.NONE) {
      licensesLevel.completeness = 100;
    } else {
      let publishedCount = 0;
      let licenseCount = 0;
      let dateCount = 0;
      for (const dataset of this.datasets) {
        if (dataset.dataAccess === DataAccessType.OPEN) {
          publishedCount += 1;
          if (dataset.license) {
            licenseCount += 1;
          }
          if (dataset.startDate != null) {
            dateCount += 1;
          }
        }
      }
      if (publishedCount <= licenseCount && publishedCount <= dateCount) {
        licensesLevel.completeness = 100;
        licensesLevel.status.push('dmp.steps.summary.licensing.all');
      } else if (publishedCount !== 0 && licenseCount === 0 && dateCount === 0) {
        licensesLevel.completeness = 0;
        licensesLevel.status.push('dmp.steps.summary.licensing.none');
      } else {
        licensesLevel.completeness =
          ((50 * (Math.min(licenseCount, publishedCount) + Math.min(dateCount, publishedCount))) / publishedCount);
        licensesLevel.status.push('dmp.steps.summary.licensing.some');
      }
    }

    // Repository
    const repositoriesLevel: Completeness = {step: 'dmp.steps.repositories.label', completeness: 0, status: []};
    if (this.dmpForm.dataKind === DataKind.NONE) {
      repositoriesLevel.completeness = 100;
      repositoriesLevel.status.push('dmp.steps.summary.repositories.nodata');
    } else if (this.dmpForm.dataKind === DataKind.UNKNOWN) {
      repositoriesLevel.completeness = 0;
      repositoriesLevel.status.push('dmp.steps.summary.repositories.nodataspecified');
    } else {
      const repos = this.dmpForm.repositories;
      const repoDatasets: string[] = SummaryComponent.getFormArrayDatasets(repos);
      if (this.datasets.length === repoDatasets.length) {
        repositoriesLevel.completeness = 100;
        repositoriesLevel.status.push('dmp.steps.summary.repositories.deposited.all');
      } else if (repoDatasets.length === 0) {
        repositoriesLevel.completeness = 0;
        repositoriesLevel.status.push('dmp.steps.summary.repositories.deposited.none');
      } else {
        repositoriesLevel.completeness = 100 * (repoDatasets.length / this.datasets.length);
        repositoriesLevel.status.push('dmp.steps.summary.repositories.deposited.some');
      }
      if ((restrictedDatasets && !this.dmpForm.restrictedAccessInfo) || (closedDatasets && !this.dmpForm.closedAccessInfo)) {
        repositoriesLevel.completeness *= 0.75;
        repositoriesLevel.status.push('dmp.steps.summary.repositories.missingexplanation');
      }
    }

    // Reuse
    const reuseLevel: Completeness = {step: 'dmp.steps.data.reuse.label', completeness: 0, status: []};
    const reusePercent = 100 / (restrictedDatasets ? 3 : 2);
    if (this.dmpForm.targetAudience) {
      reuseLevel.completeness += reusePercent;
    }
    if (this.dmpForm.tools) {
      reuseLevel.completeness += reusePercent;
    }
    if (this.dmpForm.restrictedDataAccess) {
      reuseLevel.completeness += reusePercent;
    }
    if (!reuseLevel.completeness) {
      reuseLevel.status.push('dmp.steps.summary.noinfo');
    } else if (reuseLevel.completeness >= 100) {
      reuseLevel.status.push('dmp.steps.summary.allinfo');
    } else {
      reuseLevel.status.push('dmp.steps.summary.partially');
    }

    // Costs
    const costsLevel: Completeness = {step: 'dmp.steps.costs.label', completeness: 0, status: []};
    if (this.dmpForm.costsExist == null) {
      costsLevel.completeness = 0;
      costsLevel.status.push('dmp.steps.summary.notspecified');
    } else if (!this.dmpForm.costsExist) {
      costsLevel.completeness = 100;
      costsLevel.status.push('dmp.steps.summary.costs.none');
    } else {
      costsLevel.completeness = 100;
      costsLevel.status.push(`${this.dmpForm.costs.length} cost items specified.`);
    }

    this.dataSource.push(projectsLevel, peopleLevel, specifyDataLevel, docDataQualityLevel, storageLevel,
      legalEthicalAspectsLevel, licensesLevel, repositoriesLevel, reuseLevel, costsLevel);
  }
}
