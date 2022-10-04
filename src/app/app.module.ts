import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { AppStoreModule } from './store/app-store.module';
import { AuthGuard } from './guard/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigService } from './services/config.service';
import { ConsentGuard } from './guard/consent.guard';
import { ConsentModule } from './consent/consent.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DmpTableModule } from './widgets/dmp-table/dmp-table.module';
import { EnvBannerModule } from './widgets/env-banner/env-banner.module';
import { LayoutModule } from './layout/layout.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { OAuthModule } from 'angular-oauth2-oidc';
import { PlansModule } from './plans/plans.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/', suffix: '.json' },
    { prefix: './assets/i18n/consent/', suffix: '.json' }
  ]);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES),
    BrowserAnimationsModule,
    AppStoreModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [!environment.production ? 'http://localhost:8080/api/' : `${window.location.origin}/api/`],
        sendAccessToken: true
      }
    }),

    // NGX Translate
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    // Materials
    MatToolbarModule,
    MatSidenavModule,
    MatStepperModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,

    // Modules
    LayoutModule,
    DashboardModule,
    EnvBannerModule,
    ConsentModule,
    PlansModule,
    DmpTableModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (configService: ConfigService) => () => configService.initializeApp(),
    multi: true,
    deps: [ConfigService]
  },
    AuthGuard, ConsentGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
