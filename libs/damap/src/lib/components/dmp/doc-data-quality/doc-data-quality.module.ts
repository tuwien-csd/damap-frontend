import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DocDataQualityComponent } from './doc-data-quality.component';
import { InfoMessageModule } from '../../../widgets/info-message/info-message.module';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StepIntroModule } from '../../../widgets/step-intro/step-intro.module';
import { TooltipModule } from '../../../widgets/tooltip/tooltip.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    StepIntroModule,
    TooltipModule,
    SharedModule,
    InfoMessageModule,
    // Materials
    MatSelectModule,
  ],
  declarations: [DocDataQualityComponent],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    StepIntroModule,
    TooltipModule,
    InfoMessageModule,
    SharedModule,
    DocDataQualityComponent,

    // Materials
    MatSelectModule,
  ],
})
export class DocDataQualityModule {}
