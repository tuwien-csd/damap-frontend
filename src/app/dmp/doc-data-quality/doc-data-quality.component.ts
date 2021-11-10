import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dmp-doc-data-quality',
  templateUrl: './doc-data-quality.component.html',
  styleUrls: ['./doc-data-quality.component.css']
})
export class DocDataQualityComponent implements OnInit {

  @Input() docDataStep: FormGroup;
  optionsMetadata: string[] = ['We will be using the following domain specific metadata standards:…', 'As there are no domain specific metadata standards applicable, we will provide a README file with an explanation of all values and terms used [at file level/at dataset level/at project level]'];
  optionsDataGeneration: string[] = ['Specific software will be used to process the raw data', 'Specific software will be used to conduct statistics', 'Specific software will be used to create graphical representations', 'Specific software will be used to make drawings'];
  optionsStructureAndVersioning: string[] = ['The filenames will follow the projects naming convention as defined in [add document name] and include a timestamp of creation. Version control is automated.', 'The respective work package leader will handle the structure and versioning of the research data.'];


  constructor() {
  }

  ngOnInit(): void {
  }

  get metadata(): FormControl {
    return this.docDataStep?.get('metadata') as FormControl;
  }

  get dataGeneration(): FormControl {
    return this.docDataStep?.get('dataGeneration') as FormControl;
  }

  get structure(): FormControl {
    return this.docDataStep?.get('structure') as FormControl;
  }

}
