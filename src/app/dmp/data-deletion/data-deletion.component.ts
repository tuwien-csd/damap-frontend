import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Contributor} from '../../domain/contributor';

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

  getSelection = (contributor1: Contributor, contributor2: Contributor) => contributor1?.id === contributor2?.id;

  get contributors(): Contributor[] {
    return this.dmpForm.get('contributors')?.value;
  }

  get reasonForDeletion(): FormControl {
    return this.dataset.controls.reasonForDeletion as FormControl;
  }

  get willBePublished(): boolean {
    return !!this.dmpForm.value.repositories.filter(item =>
      item.datasets.includes(this.dataset.value.referenceHash)).length;
  }

}
