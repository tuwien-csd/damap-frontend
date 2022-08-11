import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DataKind} from '../../../domain/enum/data-kind.enum';

@Component({
  selector: 'app-data-mc',
  templateUrl: './data-mc.component.html',
  styleUrls: ['./data-mc.component.css']
})
export class DataMcComponent {

  @Input() control: FormControl;
  @Input() questionLabel = 'dmp.steps.data.specify.question.kind';
  @Input() answerLabelNone = 'dmp.steps.data.specify.answer.kind.none';

  readonly dataKind: any = DataKind;

}
