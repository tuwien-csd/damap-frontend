import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import {OAuthModule} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthGuard, EnvBannerModule} from '@damap/core';
import {ConfigService} from './services/config.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ConsentGuard} from './guard/consent.guard';
import {ConsentModule} from './components/consent/consent.module';
import {LayoutModule} from './components/layout/layout.module';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {ReactiveFormsModule} from '@angular/forms';
import {AppStoreModule} from './store/app-store.module';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    {prefix: './assets/i18n/layout/', suffix: '.json'},
    {prefix: './assets/i18n/consent/', suffix: '.json'},
    {prefix: './assets/damap-core/i18n/dashboard/', suffix: '.json'},
    {prefix: './assets/damap-core/i18n/plans/', suffix: '.json'},
    {prefix: './assets/damap-core/i18n/http/', suffix: '.json'},
    {prefix: './assets/damap-core/i18n/', suffix: '.json'},
    {prefix: './assets/i18n/', suffix: '.json'}
  ]);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES),
    BrowserAnimationsModule,
    AppStoreModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.backendurl],
        sendAccessToken: true,
      },
    }),

    // NGX Translate
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    // Materials
    MatSnackBarModule,

    // Modules
    LayoutModule,
    EnvBannerModule,
    ConsentModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () =>
        configService.initializeApp(),
      multi: true,
      deps: [ConfigService],
    },
    AuthGuard,
    ConsentGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
