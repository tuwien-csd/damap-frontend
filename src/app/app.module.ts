import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {PlansComponent} from './plans/plans.component';
import {DmpComponent} from './dmp/dmp.component';
import {MatStepperModule} from '@angular/material/stepper';
import {AppStoreModule} from './store/app-store.module';
import {APP_ROUTES} from './app.routes';
import {LayoutComponent} from './layout/layout.component';
import {MatTabsModule} from '@angular/material/tabs';
import {OAuthModule} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import {ProjectComponent} from './dmp/project/project.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {DatasetDialogComponent, SpecifyDataComponent} from './dmp/specify-data/specify-data.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {LegalEthicalAspectsComponent} from './dmp/legal-ethical-aspects/legal-ethical-aspects.component';
import {LicensesComponent} from './dmp/licenses/licenses.component';
import {RepoComponent} from './dmp/repo/repo.component';
import {DocDataQualityComponent} from './dmp/doc-data-quality/doc-data-quality.component';
import {MatCardModule} from '@angular/material/card';
import {PeopleComponent} from './dmp/people/people.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {SummaryComponent} from './dmp/summary/summary.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ProjectFilterPipe} from './dmp/project/project-filter.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DmpTableComponent} from './widgets/dmp-table/dmp-table.component';
import {StorageComponent} from './dmp/data-storage/storage/storage.component';
import {StorageFilterPipe} from './dmp/data-storage/storage/storage-filter.pipe';
import {ExternalStorageComponent} from './dmp/data-storage/external-storage/external-storage.component';
import {ReuseComponent} from './dmp/reuse/reuse.component';
import {CostsComponent} from './dmp/costs/costs.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {BytePipe} from './pipe/byte.pipe';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DragdropDirective} from './directives/dragdrop.directive';
import {FileUploadComponent} from './widgets/file-upload/file-upload.component';
import {ContributorFilterPipe} from './pipe/contributor-filter.pipe';
import {LicenseSelectorDialogComponent, LicenseWizardComponent} from './widgets/license-wizard/license-wizard.component';
import {LicenseFilterPipe} from './widgets/license-wizard/license-filter.pipe';
import {ErrorMessageComponent} from './widgets/error-message/error-message.component';
import {RepoFilterComponent} from './dmp/repo/repo-filter/repo-filter.component';
import {TooltipComponent} from './widgets/tooltip/tooltip.component';
import {AuthGuard} from './guard/auth.guard';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ConfigService} from './services/config.service';
import {DataAccessComponent} from './dmp/data-storage/data-access/data-access.component';
import {SharedModule} from './shared/shared.module';
import {DataDeletionComponent} from './dmp/data-deletion/data-deletion.component';
import {EthicalAspectsComponent} from './dmp/legal-ethical-aspects/ethical-aspects/ethical-aspects.component';
import {InfoMessageComponent} from './widgets/info-message/info-message.component';
import {SaveStatusComponent} from './widgets/save-status/save-status.component';
import {StepIntroComponent} from './widgets/intro/step-intro.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatMenuModule} from '@angular/material/menu';
import {RetentionPeriodComponent} from './dmp/repo/retention-period/retention-period.component';
import {ConsentComponent} from './consent/consent.component';
import {ConsentGuard} from './guard/consent.guard';
import {ContributorManualComponent} from './dmp/people/contributor-manual/contributor-manual.component';
import {CrisTagComponent} from './widgets/cris-tag/cris-tag.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {TreeSelectFormFieldModule} from './widgets/tree-select-form-field/tree-select-form-field.module';
import {RepoTableComponent} from './dmp/repo/repo-table/repo-table.component';
import {RepoDetailsComponent} from './dmp/repo/repo-details/repo-details.component';
import {RepoRecommendationComponent} from './dmp/repo/repo-recommendation/repo-recommendation.component';
import {RepoPipe} from './pipe/repo.pipe';

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
    ProjectComponent,
    SpecifyDataComponent,
    DatasetDialogComponent,
    LegalEthicalAspectsComponent,
    LicensesComponent,
    RepoComponent,
    DocDataQualityComponent,
    PeopleComponent,
    SummaryComponent,
    DmpTableComponent,
    StorageComponent,
    ExternalStorageComponent,
    ReuseComponent,
    CostsComponent,
    FileUploadComponent,
    LicenseWizardComponent,
    LicenseSelectorDialogComponent,
    ErrorMessageComponent,
    RepoFilterComponent,
    TooltipComponent,
    DataAccessComponent,
    DataDeletionComponent,
    EthicalAspectsComponent,
    InfoMessageComponent,
    SaveStatusComponent,
    StepIntroComponent,
    RetentionPeriodComponent,
    ConsentComponent,
    ContributorManualComponent,
    CrisTagComponent,
    RepoTableComponent,
    RepoDetailsComponent,
    RepoRecommendationComponent,

    // Directives
    DragdropDirective,

    // Pipes
    ProjectFilterPipe,
    StorageFilterPipe,
    BytePipe,
    ContributorFilterPipe,
    LicenseFilterPipe,
    RepoPipe,
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
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatStepperModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatMenuModule,

    // Custom
    SharedModule,
    DashboardModule,
    TreeSelectFormFieldModule
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
