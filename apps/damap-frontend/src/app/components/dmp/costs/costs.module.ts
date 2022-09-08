import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {CostsComponent} from './costs.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {SharedModule} from '../../../shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {CrisTagModule} from '../../../widgets/cris-tag/cris-tag.module';
import {StepIntroModule} from '../../../widgets/step-intro/step-intro.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    StepIntroModule,
    SharedModule,
    CrisTagModule,

    // Materials
    MatRadioModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatButtonModule,

  ],
  declarations: [CostsComponent],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    StepIntroModule,
    SharedModule,
    CrisTagModule,
    CostsComponent,

    // Materials
    MatRadioModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatButtonModule,

  ]
})
export class CostsModule {
}
