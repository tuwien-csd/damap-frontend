import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field';

@Component({
  selector: 'app-input-wrapper [label] [control]',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.css']
})
export class InputWrapperComponent implements OnInit {

  @Input() label: string;
  @Input() control: FormControl;
  @Input() prefix: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() appearance: MatFormFieldAppearance = 'standard';

  required = false;

  constructor() {
  }

  ngOnInit(): void {
    this.required = this.control?.hasValidator(Validators.required);
  }

}
