import {BrowserModule} from '@angular/platform-browser';
import {DoBootstrap, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {RepositoriesComponent} from './repositories/repositories.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PlansComponent} from './plans/plans.component';
import {PersonsComponent} from './persons/persons.component';
import {DmpComponent} from './dmp/dmp.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {AppStoreModule} from './store/app-store.module';
import {APP_ROUTES} from './app.routes';
import {LayoutComponent} from './layout/layout.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {OAuthModule} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {ProjectComponent} from './dmp/project/project.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {DatasetDialog, SpecifyDataComponent} from './dmp/specify-data/specify-data.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
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
import { ContributorFilterPipe } from './pipe/contributor-filter.pipe';
import {LicenseSelectorDialog, LicenseWizardComponent} from './widgets/license-wizard/license-wizard.component';
import {LicenseFilterPipe} from './widgets/license-wizard/license-filter.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent,
    DashboardComponent,
    PlansComponent,
    PersonsComponent,
    DmpComponent,
    LayoutComponent,
    ProjectComponent,
    SpecifyDataComponent,
    DatasetDialog,
    LegalEthicalAspectsComponent,
    LicensesComponent,
    RepoComponent,
    DocDataQualityComponent,
    PeopleComponent,
    SummaryComponent,
    ProjectFilterPipe,
    DmpTableComponent,
    StorageComponent,
    StorageFilterPipe,
    ExternalStorageComponent,
    ReuseComponent,
    CostsComponent,
    BytePipe,
    ContributorFilterPipe,
    LicenseWizardComponent,
    LicenseFilterPipe,
    LicenseSelectorDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    RouterModule.forRoot(APP_ROUTES),
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatStepperModule,
    AppStoreModule,
    MatIconModule,
    MatTabsModule,
    OAuthModule.forRoot(),
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatRadioModule,
    MatTableModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    KeycloakAngularModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  providers: [
    AppComponent,
    {
      provide: KeycloakService,
      useValue: keycloakService,
    },
  ],
  entryComponents: [DatasetDialog, LicenseSelectorDialog, AppComponent],
})
export class AppModule implements DoBootstrap {
  async ngDoBootstrap(app) {

    const {keycloakConfig} = environment;
    try {
      await keycloakService.init({
        config: keycloakConfig,
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false
        },
        enableBearerInterceptor: true,
        loadUserProfileAtStartUp: true
      });
      app.bootstrap(AppComponent);
    } catch (error) {
      console.error('Keycloak init failed', error);
    }
  }
}
