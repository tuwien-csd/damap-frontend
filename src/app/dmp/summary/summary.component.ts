import {Component, Input, OnInit} from '@angular/core';
import {Dmp} from "../../model/dmp";

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

  @Input() dmp: Dmp;
  dataSource;

  readonly summaryTableHeaders: string[] = ['step', 'completeness', 'status'];

  constructor() {
  }

  ngOnInit(): void {
    this.evaluateCompleteness();
  }

  // TODO: automatic change detection
  // f.e. ngDoCheck
  updateTable() {
    this.evaluateCompleteness();
  }

   private evaluateCompleteness() {
    this.dataSource = [];

    // Select project(s)
    let projectsLevel: Completeness = {step: "Select project(s)", completeness: 0, status: undefined};
    if (this.dmp.project == null) {
      projectsLevel.completeness = 0;
      projectsLevel.status = 'No project(s) selected yet';
    } else {
      projectsLevel.completeness = 100;
      projectsLevel.status = 'Project: ' + this.dmp.project.title;
    }

    // People involved
    let peopleLevel: Completeness = {step: "Select people involved", completeness: 0, status: 'Not yet implemented'};
    if (this.dmp.contributors == null) {
      peopleLevel.completeness = 0; // todo: status
    } else {
      peopleLevel.completeness = 100; // todo: status
    }

    // Specify research data
    let specifyDataLevel: Completeness = {step: "Select research data", completeness: 0, status: undefined};
    // Documentation and data quality
    let docDataQualityLevel: Completeness = {step: "Documentation/data quality", completeness: 0, status: undefined};

    // Legal & ethical aspects
    let legalEthicalAspectsLevel: Completeness = {step: "Legal and ethical aspects", completeness: 0, status: undefined};

    // Licensing
    let licensesLevel: Completeness = {step: "Licensing", completeness: 0, status: undefined};

    // Repository
    let repositoriesLevel: Completeness = {step: "Select repositories", completeness: 0, status: undefined};

    this.dataSource.push(projectsLevel, peopleLevel, specifyDataLevel, docDataQualityLevel, legalEthicalAspectsLevel, licensesLevel, repositoriesLevel);
  }

}
