import {Component, OnInit} from '@angular/core';
import { ProjectComponent } from './project/project.component';

@Component({
  selector: 'app-dmp',
  templateUrl: './dmp.component.html',
  styleUrls: ['./dmp.component.css']
})
export class DmpComponent implements OnInit {

  isLinear = true;

  constructor() {
  }

  ngOnInit() {
  }

}
