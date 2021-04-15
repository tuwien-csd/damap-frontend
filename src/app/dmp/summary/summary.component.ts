import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {DataKind} from '../../domain/enum/data-kind.enum';
import {DataAccessType} from '../../domain/enum/data-access-type.enum';

export interface Completeness {
  step: string;
  completeness: number; // 0 - 100
  status: string;
}

@Component({
  selector: 'app-dmp-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor() {
  }

  get datasets() {
    return this.dmpForm.get('datasets') as FormArray;
  }

  @Input() dmpForm: FormGroup;
  dataSource;

  readonly summaryTableHeaders: string[] = ['step', 'completeness', 'status'];

  // Get all datasets assigned to any of the form array groups (storage/repository) without duplicates
  // To check if a storage location/repository is provided for all datasets
  private static getFormArrayDatasets(array: FormArray): string[] {
    const datasetsInArray: string[] = [];
    for (let i = 0; i < array.length; i++) {
      const datasets = array.at(i).value.datasets;
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
    this.evaluateCompleteness();
    this.dmpForm.valueChanges.subscribe(() => {
      this.evaluateCompleteness();
    });
  }

  private evaluateCompleteness() {
    this.dataSource = [];

    // General properties
    const restrictedDatasets = this.datasets.value.find(item => item.dataAccess === DataAccessType.restricted) != null;
    const closedDatasets = this.datasets.value.find(item => item.dataAccess === DataAccessType.closed) != null;

    // Select project
    const projectsLevel: Completeness = {step: 'Project', completeness: 0, status: undefined};
    if (!this.dmpForm.value.project) {
      projectsLevel.completeness = 0;
      projectsLevel.status = 'No project selected yet.';
    } else {
      projectsLevel.completeness = 100;
      projectsLevel.status = `Project: ${this.dmpForm.value.project.title}.`;
    }

    // People involved
    const peopleLevel: Completeness = {step: 'People involved', completeness: 0, status: undefined};
    if (this.dmpForm.value.contact) {
      peopleLevel.completeness += 50;
      peopleLevel.status = 'Contact person set. '
    } else {
      peopleLevel.status = 'Contact person is missing. '
    }
    if (this.dmpForm.value.contributors?.length === 0) {
      peopleLevel.completeness = 0;
      peopleLevel.status = 'No contributors selected yet.';
    } else {
      peopleLevel.completeness += 50;
      if (this.dmpForm.value.contributors.length === 1) {
        peopleLevel.status += 'One contributor selected.';
      } else {
        peopleLevel.status += `${this.dmpForm.value.contributors.length} contributors selected.`;
      }
    }

    // Specify research data
    const specifyDataLevel: Completeness = {step: 'Research data', completeness: 0, status: undefined};
    if (this.dmpForm.value.data.kind === DataKind.SPECIFY) {
      specifyDataLevel.completeness = 100;
      if (this.dmpForm.value.datasets.length === 1) {
        specifyDataLevel.status = 'One dataset defined.';
      } else {
        specifyDataLevel.status = `${this.dmpForm.value.datasets.length} datasets defined.`;
      }
    } else if (this.dmpForm.value.data.kind === DataKind.NONE) {
      specifyDataLevel.completeness = 50;
      specifyDataLevel.status = 'No data will be produced.';
      if (this.dmpForm.value.data.explanation) {
        specifyDataLevel.completeness += 50;
      } else {
        specifyDataLevel.status = 'Explanation is missing.';
      }
    } else {
      specifyDataLevel.completeness = 0;
      specifyDataLevel.status = 'No research data specified.';
    }

    // Documentation and data quality
    const docDataQualityLevel: Completeness = {step: 'Documentation/data quality', completeness: 0, status: undefined};
    const docPercent = 100 / 3; // 100%/number of questions
    if (this.dmpForm.value.documentation.metadata !== '') {
      docDataQualityLevel.completeness += docPercent;
    }
    if (this.dmpForm.value.documentation.dataGeneration !== '') {
      docDataQualityLevel.completeness += docPercent;
    }
    if (this.dmpForm.value.documentation.structure !== '') {
      docDataQualityLevel.completeness += docPercent;
    }
    if (docDataQualityLevel.completeness === 0) {
      docDataQualityLevel.status = 'No information provided.';
    } else if (docDataQualityLevel.completeness === 100) {
      docDataQualityLevel.status = 'All information necessary provided.';
    } else {
      docDataQualityLevel.status = 'Partially filled out.'
    }

    // Storage
    const storageLevel: Completeness = {step: 'Storage and backup', completeness: 0, status: undefined};
    if (this.dmpForm.value.data.kind === DataKind.NONE) {
      storageLevel.completeness = 100;
      storageLevel.status = 'No data to be stored.';
    } else if (this.dmpForm.value.data.kind === DataKind.UNKNOWN) {
      storageLevel.completeness = 0;
      storageLevel.status = 'No data defined yet.';
    } else {
      const storage = this.dmpForm.get('storage') as FormArray;
      const eStorage = this.dmpForm.get('externalStorage') as FormArray;
      const storageDatasets: string[] =
        [...new Set([...SummaryComponent.getFormArrayDatasets(storage), ...SummaryComponent.getFormArrayDatasets(eStorage)])];
      if (this.datasets.length <= storageDatasets.length) {
        storageLevel.completeness = 100;
        storageLevel.status = 'All data are stored. ';
      } else if (storageDatasets.length === 0) {
        storageLevel.completeness = 0;
        storageLevel.status = 'No data stored yet. ';
      } else {
        storageLevel.completeness = 100 * (storageDatasets.length / this.datasets.length);
        storageLevel.status = 'Some data are stored. ';
      }
      if (eStorage.value.length && !this.dmpForm.value.externalStorageInfo) {
        storageLevel.completeness = storageLevel.completeness > 0 ? storageLevel.completeness * 0.5 : 0;
        storageLevel.status += 'Usage explanation is missing.'
      }
    }

    // Legal & ethical aspects
    const legalEthicalAspectsLevel: Completeness = {
      step: 'Legal and ethical aspects',
      completeness: 0,
      status: undefined
    };
    const legalPercent = 100 / 7;
    if (this.dmpForm.value.legal.personalInformation != null) {
      legalEthicalAspectsLevel.completeness += legalPercent;
    }
    if (this.dmpForm.value.legal.sensitiveData != null) {
      legalEthicalAspectsLevel.completeness += legalPercent;
    }
    if (this.dmpForm.value.legal.legalRestrictions != null) {
      legalEthicalAspectsLevel.completeness += legalPercent;
    }
    if (this.dmpForm.value.legal.ethicalIssues != null) {
      legalEthicalAspectsLevel.completeness += legalPercent;
    }
    if (this.dmpForm.value.legal.committeeApproved != null) {
      legalEthicalAspectsLevel.completeness += legalPercent;
    }
    if (this.dmpForm.value.legal.ethicsReport) {
      legalEthicalAspectsLevel.completeness += legalPercent;
    }
    if (this.dmpForm.value.legal.sensitiveDataSecurity) {
      legalEthicalAspectsLevel.completeness += legalPercent;
    }
    if (legalEthicalAspectsLevel.completeness === 0) {
      legalEthicalAspectsLevel.status = 'No information provided.';
    } else if (legalEthicalAspectsLevel.completeness === 100) {
      legalEthicalAspectsLevel.status = 'All information necessary provided.';
    } else {
      legalEthicalAspectsLevel.status = 'Partially filled out.'
    }

    // Licensing
    const licensesLevel: Completeness = {step: 'Licensing', completeness: 0, status: undefined};
    if (this.dmpForm.value.data.kind === DataKind.NONE) {
      licensesLevel.completeness = 100;
    } else {
      let publishedCount = 0;
      let licenseCount = 0;
      let dateCount = 0;
      for (let i = 0; i < this.datasets.length; i++) {
        const dataset = this.datasets.at(i);
        if (dataset.value.publish === true) {
          publishedCount += 1;
          if (dataset.value.license.length > 0) {
            licenseCount += 1;
          }
          if (dataset.value.start_date != null) {
            dateCount += 1;
          }
        }
      }
      if (publishedCount <= licenseCount && publishedCount <= dateCount) {
        licensesLevel.completeness = 100;
        licensesLevel.status = 'All datasets have been assigned a license and a start date.';
      } else if (publishedCount !== 0 && licenseCount === 0 && dateCount === 0) {
        licensesLevel.completeness = 0;
        licensesLevel.status = 'No dataset has been assigned a license or a start date.';
      } else {
        licensesLevel.completeness =
          ((50 * (Math.min(licenseCount, publishedCount) + Math.min(dateCount, publishedCount))) / publishedCount);
        licensesLevel.status = 'Some datasets have been assigned a license and a start date.';
      }
    }

    // Repository
    const repositoriesLevel: Completeness = {step: 'Repositories', completeness: 0, status: undefined};
    if (this.dmpForm.value.data.kind === DataKind.NONE) {
      repositoriesLevel.completeness = 100;
      repositoriesLevel.status = 'No data to be deposited.';
    } else if (this.dmpForm.value.data.kind === DataKind.UNKNOWN) {
      repositoriesLevel.completeness = 0;
      repositoriesLevel.status = 'No data defined yet.';
    } else {
      const repos = this.dmpForm.get('hosts') as FormArray;
      const repoDatasets: string[] = SummaryComponent.getFormArrayDatasets(repos);
      if (this.datasets.length === repoDatasets.length) {
        repositoriesLevel.completeness = 100;
        repositoriesLevel.status = 'All data are deposited. ';
      } else if (repoDatasets.length === 0) {
        repositoriesLevel.completeness = 0;
        repositoriesLevel.status = 'No data deposited yet. ';
      } else {
        repositoriesLevel.completeness = 100 * (repoDatasets.length / this.datasets.length);
        repositoriesLevel.status = 'Some data are deposited. ';
      }
      if ((restrictedDatasets && !this.dmpForm.value.restrictedAccessInfo) || (closedDatasets && !this.dmpForm.value.closedAccessInfo)) {
        repositoriesLevel.completeness *= 0.75;
        repositoriesLevel.status += 'Explanation for datasets with restricted/closed access missing.';
      }
    }

    // Reuse
    const reuseLevel: Completeness = {step: 'Reuse of data', completeness: 0, status: undefined};
    const reusePercent = 100 / (restrictedDatasets ? 3 : 2);
    if (this.dmpForm.value.reuse.targetAudience) {
      reuseLevel.completeness += reusePercent;
    }
    if (this.dmpForm.value.reuse.tools) {
      reuseLevel.completeness += reusePercent;
    }
    if (this.dmpForm.value.reuse.restrictedAccess) {
      reuseLevel.completeness += reusePercent;
    }
    if (!reuseLevel.completeness) {
      reuseLevel.status = 'No information provided.';
    } else if (reuseLevel.completeness >= 100) {
      reuseLevel.status = 'All information necessary provided.';
    } else {
      reuseLevel.status = 'Partially filled out.';
    }

    // Costs
    const costsLevel: Completeness = {step: 'Costs', completeness: 0, status: undefined};
    if (this.dmpForm.value.costs?.exist == null) {
      costsLevel.completeness = 0;
      costsLevel.status = 'Not specified yet.';
    } else if (!this.dmpForm.value.costs?.exist) {
      costsLevel.completeness = 100;
      costsLevel.status = 'There are no costs.';
    } else {
      costsLevel.completeness = 100;
      costsLevel.status = `${this.dmpForm.value.costs.list?.length} cost items specified.`;
    }

    this.dataSource.push(projectsLevel, peopleLevel, specifyDataLevel, docDataQualityLevel, storageLevel,
      legalEthicalAspectsLevel, licensesLevel, repositoriesLevel, reuseLevel, costsLevel);
  }
}
