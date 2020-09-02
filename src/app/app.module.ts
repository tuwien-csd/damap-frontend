import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
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
import {AppStoreModule} from "./store/app-store.module";
import {APP_ROUTES} from "./app.routes";
import {LayoutComponent} from './layout/layout.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {OAuthModule} from "angular-oauth2-oidc";
import {environment} from "../environments/environment";
import {KeycloakService} from "keycloak-angular";
import {ProjectComponent} from './dmp/project/project.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {SpecifyDataComponent, SpecifyDataDialog} from './dmp/specify-data/specify-data.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from "@angular/material/table";
import {MatChipsModule} from "@angular/material/chips";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {LegalEthicalAspectsComponent} from './dmp/legal-ethical-aspects/legal-ethical-aspects.component';
import {LicensesComponent} from './dmp/licenses/licenses.component';
import {RepoComponent} from './dmp/repo/repo.component';
import {DocDataQualityComponent} from './dmp/doc-data-quality/doc-data-quality.component';
import {MatCardModule} from "@angular/material/card";
import {PeopleComponent} from './dmp/people/people.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatPaginatorModule} from "@angular/material/paginator";
import { SummaryComponent } from './dmp/summary/summary.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";

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
    SpecifyDataDialog,
    LegalEthicalAspectsComponent,
    LicensesComponent,
    RepoComponent,
    DocDataQualityComponent,
    PeopleComponent,
    SummaryComponent
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
        MatProgressBarModule
    ],
  providers: [
    AppComponent,
    {
      provide: KeycloakService,
      useValue: keycloakService,
    },
  ],
  entryComponents: [AppComponent],
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef) {
    keycloakService
      .init({
        config: {
          url: environment.keycloakUrl,
          realm: 'quarkus',
          clientId: 'dmap'
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false
        },
        enableBearerInterceptor: true,
      })
      .then(() => {
        console.log('[ngDoBootstrap] bootstrap app');

        appRef.bootstrap(AppComponent);
      })
      .catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
  }
}
