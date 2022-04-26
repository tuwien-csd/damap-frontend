import {NgModule} from '@angular/core';
import {PersonSearchComponent} from './person-search.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [PersonSearchComponent],
  imports: [
    CommonModule,
    TranslateModule,

    // Materials
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptionModule
  ],
  exports:[
    CommonModule,
    TranslateModule,
    PersonSearchComponent,

    // Materials
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptionModule
  ]
})
export class PersonSearchModule {
}
