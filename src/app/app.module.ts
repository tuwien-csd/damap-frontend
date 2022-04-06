import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {PlansComponent} from './plans/plans.component';
import {MatStepperModule} from '@angular/material/stepper';
import {AppStoreModule} from './store/app-store.module';
import {APP_ROUTES} from './app.routes';
import {LayoutComponent} from './layout/layout.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import {MatRippleModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthGuard} from './guard/auth.guard';
import {ConfigService} from './services/config.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatMenuModule} from '@angular/material/menu';
import {ConsentComponent} from './consent/consent.component';
import {ConsentGuard} from './guard/consent.guard';
import {DashboardModule} from './dashboard/dashboard.module';
import {EnvBannerModule} from './widgets/env-banner/env-banner.module';
import {VersionModule} from './version/version.module';
import {DmpTableModule} from './widgets/dmp-table/dmp-table.module';
import {DmpModule} from './dmp/dmp.module';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    // Components
    AppComponent,
    PlansComponent,
    LayoutComponent,
    ConsentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
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
    DashboardModule,
    EnvBannerModule,
    DmpModule,
    VersionModule,
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
