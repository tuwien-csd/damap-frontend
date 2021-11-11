import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field';

@Component({
  selector: 'app-textarea-wrapper [label] [control]',
  templateUrl: './textarea-wrapper.component.html',
  styleUrls: ['./textarea-wrapper.component.css']
})
export class TextareaWrapperComponent implements OnInit {

  @Input() label: string;
  @Input() control: FormControl;
  @Input() placeholder: string;
  @Input() autocompleteOptions: string[];
  @Input() appearance: MatFormFieldAppearance = 'fill';

  required = false;

  constructor() {
  }

  ngOnInit(): void {
    this.required = this.control?.hasValidator(Validators.required);
  }

}
