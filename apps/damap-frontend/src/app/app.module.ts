import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper';
import {AppStoreModule} from './store/app-store.module';
import {APP_ROUTES} from './app.routes';
import {OAuthModule} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import {MatRippleModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthGuard} from './guard/auth.guard';
import {ConfigService} from './services/config.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MatMenuModule} from '@angular/material/menu';
import {ConsentGuard} from './guard/consent.guard';
import {DashboardModule} from './components/dashboard/dashboard.module';
import {EnvBannerModule} from './widgets/env-banner/env-banner.module';
import {DmpTableModule} from './widgets/dmp-table/dmp-table.module';
import {PlansModule} from './components/plans/plans.module';
import {ConsentModule} from './components/consent/consent.module';
import {LayoutModule} from './components/layout/layout.module';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {ReactiveFormsModule} from '@angular/forms';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    {prefix: './assets/i18n/', suffix: '.json'},
    {prefix: './assets/i18n/consent/', suffix: '.json'}
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
