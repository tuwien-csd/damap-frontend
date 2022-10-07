import {Component, Input} from '@angular/core';
import {UntypedFormArray, UntypedFormGroup} from '@angular/forms';
import {DataAccessType} from '../../../domain/enum/data-access-type.enum';
import {DataSource} from '../../../domain/enum/data-source.enum';

@Component({
  selector: 'app-dmp-reuse',
  templateUrl: './reuse.component.html',
  styleUrls: ['./reuse.component.css']
})
export class ReuseComponent {

  @Input() reuseStep: UntypedFormGroup;
  @Input() datasets: UntypedFormArray;

  optionsTargetAudience: string[] = [
    'Members of the scientific community',
    'Officers of local/national governments',
    'Decision makers in industry',
    'Students and general public',
    'Others:...'];

  constructor() {
  }

  get restricted() {
    return this.datasets?.value.filter(item => item.dataAccess === DataAccessType.RESTRICTED && item.source === DataSource.NEW);
  }
}
