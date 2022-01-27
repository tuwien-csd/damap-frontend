import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-save-status',
  templateUrl: './save-status.component.html',
  styleUrls: ['./save-status.component.css']
})
export class SaveStatusComponent {

  @Input() saved: boolean;

  constructor() {
  }

}
