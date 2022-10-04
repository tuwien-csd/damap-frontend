import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-cris-tag',
  templateUrl: './cris-tag.component.html',
  styleUrls: ['./cris-tag.component.css']
})
export class CrisTagComponent {

  @Input() cris = null;

}
