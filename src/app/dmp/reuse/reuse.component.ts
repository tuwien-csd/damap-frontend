import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {DataAccessType} from '../../domain/enum/data-access-type.enum';

@Component({
  selector: 'app-dmp-reuse',
  templateUrl: './reuse.component.html',
  styleUrls: ['./reuse.component.css']
})
export class ReuseComponent implements OnInit {

  @Input() reuseStep: FormGroup;
  @Input() datasets: FormArray;

  restricted: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.datasets.valueChanges.subscribe(
      newVal => {
        this.restricted = [];
        for (const val of newVal) {
          if(val.dataAccess === DataAccessType.restricted) {
            this.addRestricted(val.title);
          }
        }
      }
    )
  }

  private addRestricted(value: string) {
    this.restricted.push(value);
  }

}
