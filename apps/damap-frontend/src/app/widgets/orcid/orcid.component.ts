import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-orcid',
  templateUrl: './orcid.component.html',
  styleUrls: ['./orcid.component.css']
})
export class OrcidComponent {

  @Input() orcidId: string;

  constructor() { }

}
