import {Component, Input} from '@angular/core';
import {UntypedFormArray, UntypedFormGroup} from '@angular/forms';
import {DataSource} from '../../../../domain/enum/data-source.enum';

@Component({
  selector: 'app-retention-period',
  templateUrl: './retention-period.component.html',
  styleUrls: ['./retention-period.component.css']
})
export class RetentionPeriodComponent {

  @Input() dmpForm: UntypedFormGroup;
  @Input() datasets: UntypedFormArray;

  options: number[] = [10, 25, 100];
  readonly datasetSource: any = DataSource;

  constructor() {
  }

}
