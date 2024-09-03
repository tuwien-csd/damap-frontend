import { CommonModule } from '@angular/common';
import { EnvBannerModule } from '@damap/core';
import { LayoutComponent } from './layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    EnvBannerModule,

    // Materials
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  declarations: [LayoutComponent],
  exports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    EnvBannerModule,
    LayoutComponent,

    // Materials
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
})
export class LayoutModule {}
