import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dmp-reuse',
  templateUrl: './reuse.component.html',
  styleUrls: ['./reuse.component.css']
})
export class ReuseComponent implements OnInit {

  @Input() reuseStep: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

}
