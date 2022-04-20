import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PlansComponent} from './plans/plans.component';
import {LayoutComponent} from './layout/layout.component';
import {AuthGuard} from './guard/auth.guard';
import {ConsentGuard} from './guard/consent.guard';

export const APP_ROUTES: Routes = [
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard, ConsentGuard], children: [
      {path: '', component: DashboardComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'plans', component: PlansComponent},
      {
        path: 'dmp',
        loadChildren: () => import('./dmp/dmp.module').then(m => m.DmpModule)
      },
    ]
  }];
