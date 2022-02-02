import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-ethical-aspects',
  templateUrl: './ethical-aspects.component.html',
  styleUrls: ['./ethical-aspects.component.css']
})
export class EthicalAspectsComponent {

  @Input() legalEthicalStep: FormGroup;

  @Output() crisValueChange = new EventEmitter<string>();

  constructor() {
  }

  changeCrisValue(controlName: string) {
    this.crisValueChange.emit(controlName);
  }


}
