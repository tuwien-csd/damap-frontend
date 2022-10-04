import {NgModule} from '@angular/core';
import {EnvBannerComponent} from './env-banner.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [EnvBannerComponent],
  imports: [
    CommonModule,
    TranslateModule,

    // Materials
    MatCardModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    EnvBannerComponent,

    // Materials
    MatCardModule
  ]
})
export class EnvBannerModule {}
