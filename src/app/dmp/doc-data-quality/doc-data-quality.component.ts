import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dmp-doc-data-quality',
  templateUrl: './doc-data-quality.component.html',
  styleUrls: ['./doc-data-quality.component.css']
})
export class DocDataQualityComponent implements OnInit {

  @Input() dmpForm: FormGroup;

  docDataStep: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.docDataStep = this.dmpForm.get('documentation') as FormGroup;
  }

}
