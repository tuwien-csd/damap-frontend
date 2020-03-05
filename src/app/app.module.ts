import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
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
import {PlanComponent} from './plans/plan.component';
import {PersonsComponent} from './persons/persons.component';
import {NewPlanComponent} from './plans/new-plan/new-plan.component';
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

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent,
    DashboardComponent,
    PlanComponent,
    PersonsComponent,
    NewPlanComponent,
    LayoutComponent
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
    MatTabsModule
  ],
  providers: [
    AppComponent,
    {
      provide: KeycloakService,
      useValue: keycloakService,
    },
  ],
  entryComponents : [AppComponent],
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef) {
    keycloakService
      .init({config: {
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
