import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-data-deletion',
  templateUrl: './data-deletion.component.html',
  styleUrls: ['./data-deletion.component.css']
})
export class DataDeletionComponent implements OnInit {

  @Input() dataset: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  get reasonForDeletion(): FormControl {
    return this.dataset.controls.reasonForDeletion as FormControl;
  }

}
