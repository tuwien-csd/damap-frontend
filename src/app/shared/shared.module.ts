import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputWrapperComponent} from './input-wrapper/input-wrapper.component';
import {TextareaWrapperComponent} from './textarea-wrapper/textarea-wrapper.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [InputWrapperComponent, TextareaWrapperComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Materials
    MatInputModule,
    MatAutocompleteModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputWrapperComponent,
    TextareaWrapperComponent
  ]
})
export class SharedModule {
}
