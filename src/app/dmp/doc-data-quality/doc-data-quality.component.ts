import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dmp-doc-data-quality',
  templateUrl: './doc-data-quality.component.html',
  styleUrls: ['./doc-data-quality.component.css']
})
export class DocDataQualityComponent implements OnInit {

  // @Input() dmpForm: FormGroup;

  docDataStep = this.formBuilder.group({
    metadata: [''],
    dataGeneration: [''],
    structure: [''],
    targetAudience: ['']
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.dmpForm.addControl('docData', this.docDataStep);
    // this.docDataStep.valueChanges.subscribe(newVal => console.log(newVal));
  }

}
