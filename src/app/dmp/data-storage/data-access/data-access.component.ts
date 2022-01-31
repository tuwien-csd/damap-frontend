import {Component, Input} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {AccessRight} from '../../../domain/enum/access-right';

@Component({
  selector: 'app-data-access',
  templateUrl: './data-access.component.html',
  styleUrls: ['./data-access.component.css']
})
export class DataAccessComponent {

  @Input() dmpForm: FormGroup;
  @Input() datasets: FormArray;

  accessRight = AccessRight;
  panelOpenState = false;

  constructor() {
  }

}
