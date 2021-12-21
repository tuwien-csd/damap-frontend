import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-save-status',
  templateUrl: './save-status.component.html',
  styleUrls: ['./save-status.component.css']
})
export class SaveStatusComponent implements OnInit {

  @Input() saved: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
