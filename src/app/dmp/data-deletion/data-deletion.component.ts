import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-data-deletion',
  templateUrl: './data-deletion.component.html',
  styleUrls: ['./data-deletion.component.css']
})
export class DataDeletionComponent {

  @Input() dataset: FormGroup;
  @Input() dmpForm: FormGroup;

  constructor() {
  }

  get reasonForDeletion(): FormControl {
    return this.dataset.controls.reasonForDeletion as FormControl;
  }

  get willBePublished(): boolean {
    return this.dmpForm.value.repositories.filter(item =>
      item.datasets.includes(this.dataset.value.referenceHash)).length;
  }

}
