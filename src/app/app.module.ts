import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import {LoginComponent} from './login/login.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {AppStoreModule} from "./store/app-store.module";
import {AuthService} from "./auth.service";
import {APP_ROUTES} from "./app.routes";
import { LayoutComponent } from './layout/layout.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent,
    DashboardComponent,
    PlanComponent,
    PersonsComponent,
    NewPlanComponent,
    LoginComponent,
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
    MatIconModule
  ],
  providers: [AppComponent, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
