import {Component, Input} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-retention-period',
  templateUrl: './retention-period.component.html',
  styleUrls: ['./retention-period.component.css']
})
export class RetentionPeriodComponent {

  @Input() dmpForm: FormGroup;
  @Input() datasets: FormArray;

  options: number[] = [10,25,100];

  constructor() { }

}
