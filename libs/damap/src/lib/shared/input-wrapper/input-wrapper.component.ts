import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-input-wrapper [label] [control]',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.css']
})
export class InputWrapperComponent implements OnInit {

  @Input() label: string;
  @Input() control: UntypedFormControl;
  @Input() prefix: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() appearance: MatFormFieldAppearance = 'standard';
  @Input() maxLength = 255;

  required = false;

  constructor() {
  }

  ngOnInit(): void {
    this.required = this.control?.hasValidator(Validators.required);
  }

}
