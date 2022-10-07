import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {LayoutComponent} from './layout.component';
import {EnvBannerModule} from '@damap/core';
import {RouterModule} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';

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
    MatToolbarModule
  ],
  declarations: [
    LayoutComponent
  ],
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
    MatToolbarModule
  ]
})
export class LayoutModule {
}
