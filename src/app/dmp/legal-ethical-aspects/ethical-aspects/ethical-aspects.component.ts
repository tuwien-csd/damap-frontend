import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-ethical-aspects',
  templateUrl: './ethical-aspects.component.html',
  styleUrls: ['./ethical-aspects.component.css']
})
export class EthicalAspectsComponent {

  @Input() legalEthicalStep: FormGroup;

  constructor() {
  }

}
