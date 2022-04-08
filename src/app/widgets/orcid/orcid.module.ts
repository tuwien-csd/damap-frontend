import {NgModule} from '@angular/core';
import {OrcidComponent} from './orcid.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [OrcidComponent],
  imports: [CommonModule],
  exports: [CommonModule, OrcidComponent]
})
export class OrcidModule{}
