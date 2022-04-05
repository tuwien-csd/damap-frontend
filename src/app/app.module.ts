import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {PlansComponent} from './plans/plans.component';
import {DmpComponent, SaveVersionDialogComponent} from './dmp/dmp.component';
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
import {TagModule} from './widgets/tag/tag.module';
import {InfoMessageModule} from './widgets/info-message/info-message.module';
import {SaveStatusModule} from './widgets/save-status/save-status.module';
import {DmpTableModule} from './widgets/dmp-table/dmp-table.module';
import {CostsModule} from './dmp/costs/costs.module';
import {DataDeletionModule} from './dmp/data-deletion/data-deletion.module';
import {DataStorageModule} from './dmp/data-storage/data-storage.module';
import {DocDataQualityModule} from './dmp/doc-data-quality/doc-data-quality.module';
import {LegalEthicalAspectsModule} from './dmp/legal-ethical-aspects/legal-ethical-aspects.module';
import {LicensesModule} from './dmp/licenses/licenses.module';
import {PeopleModule} from './dmp/people/people.module';
import {ProjectModule} from './dmp/project/project.module';
import {RepoModule} from './dmp/repo/repo.module';
import {ReuseModule} from './dmp/reuse/reuse.module';
import {SpecifyDataModule} from './dmp/specify-data/specify-data.module';
import {SummaryModule} from './dmp/summary/summary.module';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    // Components
    AppComponent,
    PlansComponent,
    DmpComponent,
    LayoutComponent,
    ConsentComponent,
    SaveVersionDialogComponent,
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

    // Custom
    DashboardModule,
    VersionModule,
    EnvBannerModule,
    TagModule,
    InfoMessageModule,
    SaveStatusModule,
    DmpTableModule,
    CostsModule,
    DataDeletionModule,
    DataStorageModule,
    DocDataQualityModule,
    LegalEthicalAspectsModule,
    LicensesModule,
    PeopleModule,
    ProjectModule,
    RepoModule,
    ReuseModule,
    SpecifyDataModule,
    SummaryModule
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
