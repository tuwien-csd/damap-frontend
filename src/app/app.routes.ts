import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PlansComponent} from './plans/plans.component';
import {DmpComponent} from './dmp/dmp.component';
import {LayoutComponent} from './layout/layout.component';
import {AuthGuard} from './auth/auth.guard';

export const APP_ROUTES: Routes = [
  {path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
      {path: '', component: DashboardComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'plans', component: PlansComponent},
      {path: 'dmp', component: DmpComponent},
      {path: 'dmp/:id', component: DmpComponent}
    ]
}];
