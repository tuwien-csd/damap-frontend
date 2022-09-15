import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LegalEthicalAspectsComponent} from './legal-ethical-aspects.component';
import {EthicalAspectsComponent} from './ethical-aspects/ethical-aspects.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../../../shared/shared.module';
import {StepIntroModule} from '../../../widgets/step-intro/step-intro.module';
import {CrisTagModule} from '../../../widgets/cris-tag/cris-tag.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {TooltipModule} from '../../../widgets/tooltip/tooltip.module';
import {InfoMessageModule} from '../../../widgets/info-message/info-message.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    StepIntroModule,
    CrisTagModule,
    TooltipModule,
    InfoMessageModule,

    // Materials
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  declarations: [
    LegalEthicalAspectsComponent,
    EthicalAspectsComponent
  ],
  exports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    StepIntroModule,
    CrisTagModule,
    TooltipModule,
    InfoMessageModule,
    LegalEthicalAspectsComponent,

    // Materials
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
  ]
})
export class LegalEthicalAspectsModule {
}
