import {Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PlanComponent} from "./plans/plan.component";
import {PersonsComponent} from "./persons/persons.component";
import {RepositoriesComponent} from "./repositories/repositories.component";
import {NewPlanComponent} from "./plans/new-plan/new-plan.component";
import {AuthGuardService} from "./auth-guard.service";

export const APP_ROUTES: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: DashboardComponent, canActivate: [AuthGuardService], children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'persons', component: PersonsComponent},
      {path: 'repositories', component: RepositoriesComponent},
      {path: 'plans', component: PlanComponent, children: [
          {path: 'new', component: NewPlanComponent}
      ]}
    ]
}];
