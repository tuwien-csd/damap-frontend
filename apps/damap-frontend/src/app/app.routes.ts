import {Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PlansComponent} from './components/plans/plans.component';
import {LayoutComponent} from './components/layout/layout.component';
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
        loadChildren: () => import('./components/dmp/dmp.module').then(m => m.DmpModule)
      },
    ]
  }];
