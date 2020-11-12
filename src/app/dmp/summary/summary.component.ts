import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";

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

  @Input() dmpForm: FormGroup;
  dataSource;

  readonly summaryTableHeaders: string[] = ['step', 'completeness', 'status'];

  constructor() {
  }

  ngOnInit(): void {
    this.evaluateCompleteness();
    this.dmpForm.valueChanges.subscribe(() => {
      this.evaluateCompleteness();
      console.log("Update summary");
      console.log(this.dataSource.data);
    });
  }

  get datasets() {
    const data = this.dmpForm.get('data') as FormGroup;
    return data.get('datasets') as FormArray;
  }

  private evaluateCompleteness() {
    this.dataSource = [];

    // Select project
    let projectsLevel: Completeness = {step: "Select project", completeness: 0, status: undefined};
    if (this.dmpForm.value.project == null) {
      projectsLevel.completeness = 0;
      projectsLevel.status = 'No project selected yet';
    } else {
      projectsLevel.completeness = 100;
      projectsLevel.status = 'Project: ' + this.dmpForm.value.project.titleEn;
    }

    // People involved
    let peopleLevel: Completeness = {step: "Select people involved", completeness: 0, status: 'Not yet implemented'};
    if (this.dmpForm.value.contributors.length == 0) {
      peopleLevel.completeness = 0;
      peopleLevel.status = 'No contributors selected yet';
    } else {
      peopleLevel.completeness = 100;
      if (this.dmpForm.value.contributors.length == 1) {
        peopleLevel.status = 'One contributor selected';
      } else {
        peopleLevel.status = this.dmpForm.value.contributors.length + ' contributors selected';
      }
    }

    // Specify research data
    let specifyDataLevel: Completeness = {step: "Select research data", completeness: 0, status: undefined};
    if (this.dmpForm.value.data.kind == 'specify') {
      specifyDataLevel.completeness = 100;
      if (this.dmpForm.value.data.datasets.length == 1) {
        specifyDataLevel.status = 'One dataset defined';
      } else {
        specifyDataLevel.status = this.dmpForm.value.data.datasets.length + ' datasets defined';
      }
    } else if (this.dmpForm.value.data.kind == 'none') {
      specifyDataLevel.completeness = 50;
      specifyDataLevel.status = 'No data will be produced';
      if (this.dmpForm.value.data.explanation != '') {
        specifyDataLevel.completeness += 50;
      } else {
        specifyDataLevel.status = ', explanation missing';
      }
    } else {
      specifyDataLevel.completeness = 0;
      specifyDataLevel.status = 'No research data specified';
    }

    // Documentation and data quality
    let docDataQualityLevel: Completeness = {step: "Documentation/data quality", completeness: 0, status: undefined};
    if (this.dmpForm.value.documentation.metadata != '') {
      docDataQualityLevel.completeness += 25;
    }
    if (this.dmpForm.value.documentation.dataGeneration != '') {
      docDataQualityLevel.completeness += 25;
    }
    if (this.dmpForm.value.documentation.structure != '') {
      docDataQualityLevel.completeness += 25;
    }
    if (this.dmpForm.value.documentation.targetAudience != '') {
      docDataQualityLevel.completeness += 25;
    }
    if (docDataQualityLevel.completeness == 0) {
      docDataQualityLevel.status = 'No information provided';
    } else if (docDataQualityLevel.completeness == 100) {
      docDataQualityLevel.status = 'All information necessary provided';
    } else {
      docDataQualityLevel.status = 'Partially filled out'
    }

    // Legal & ethical aspects
    let legalEthicalAspectsLevel: Completeness = {
      step: "Legal and ethical aspects",
      completeness: 0,
      status: undefined
    };
    if (this.dmpForm.value.legal.personalInformation != null) {
      legalEthicalAspectsLevel.completeness += 20;
    }
    if (this.dmpForm.value.legal.sensitiveData != null) {
      legalEthicalAspectsLevel.completeness += 20;
    }
    if (this.dmpForm.value.legal.legalRestrictions != null) {
      legalEthicalAspectsLevel.completeness += 20;
    }
    if (this.dmpForm.value.legal.ethicalIssues != null) {
      legalEthicalAspectsLevel.completeness += 20;
    }
    if (this.dmpForm.value.legal.committeeApproved != null) {
      legalEthicalAspectsLevel.completeness += 20;
    }
    if (this.dmpForm.value.legal.ethicsReport != '') {
      legalEthicalAspectsLevel.completeness += 20;
    }
    if (legalEthicalAspectsLevel.completeness == 0) {
      legalEthicalAspectsLevel.status = 'No information provided';
    } else if (legalEthicalAspectsLevel.completeness == 100) {
      legalEthicalAspectsLevel.status = 'All information necessary provided';
    } else {
      legalEthicalAspectsLevel.status = 'Partially filled out'
    }

    // Licensing
    let licensesLevel: Completeness = {step: "Licensing", completeness: 0, status: undefined};
    if (this.dmpForm.value.data.kind == 'none') {
      licensesLevel.completeness = 100;
    } else {
      let publishedCount = 0;
      let licenseCount = 0;
      let dateCount = 0;
      for (let i = 0; i < this.datasets.length; i++) {
        let dataset = this.datasets.at(i);
        if (dataset.value.publish == true) {
          publishedCount += 1;
          if (dataset.value.license.length > 0) {
            licenseCount += 1;
          }
          if (dataset.value.start_date != null) {
            dateCount += 1;
          }
        }
      }
      if (publishedCount == licenseCount && publishedCount == dateCount) {
        licensesLevel.completeness = 100;
        licensesLevel.status = 'All datasets have been assigned a license';
      } else if (publishedCount != 0 && licenseCount == 0 && dateCount == 0) {
        licensesLevel.completeness = 0;
        licensesLevel.status = 'No dataset has been assigned a license';
      } else {
        licensesLevel.completeness = 100 * ((50 * (licenseCount + dateCount)) / (100 * publishedCount));
        licensesLevel.status = 'Some datasets have been assigned a license';
      }
    }

    // Repository
    let repositoriesLevel: Completeness = {step: "Select repositories", completeness: 0, status: undefined};
    if (this.dmpForm.value.data.kind == 'none') {
      repositoriesLevel.completeness = 100;
      repositoriesLevel.status = 'No data specified';
    } else {
      let repoDatasets: any[] = [];
      let repos = this.dmpForm.get('hosts') as FormArray;
      for (let i = 0; i < repos.length; i++) {
        let repoData = repos.at(i).value.datasets;
        for (let j = 0; j < repoData.length; j++) {
          let index = repoDatasets.indexOf(repoData[j]);
          if (index < 0) {
            repoDatasets.push(repoData[j]);
          }
        }
      }
      if (this.datasets.length == repoDatasets.length) {
        repositoriesLevel.completeness = 100;
        repositoriesLevel.status = 'All data are deposited';
      } else if (repoDatasets.length == 0) {
        repositoriesLevel.completeness = 0;
        repositoriesLevel.status = 'No data deposited yet';
      } else {
        repositoriesLevel.completeness = 100 * (repoDatasets.length / this.datasets.length);
        repositoriesLevel.status = 'Some data are deposited';
      }

    }

    this.dataSource.push(projectsLevel, peopleLevel, specifyDataLevel, docDataQualityLevel, legalEthicalAspectsLevel, licensesLevel, repositoriesLevel);
  }

}
