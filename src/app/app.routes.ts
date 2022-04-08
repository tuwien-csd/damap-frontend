import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PlansComponent} from './plans/plans.component';
import {DmpComponent} from './dmp/dmp.component';
import {LayoutComponent} from './layout/layout.component';
import {AuthGuard} from './guard/auth.guard';
import {ConsentGuard} from './guard/consent.guard';
import {VersionListComponent} from './version/version-list/version-list.component';
import {VersionViewComponent} from './version/version-view/version-view.component';

export const APP_ROUTES: Routes = [
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard, ConsentGuard], children: [
      {path: '', component: DashboardComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'plans', component: PlansComponent},
      {path: 'dmp', component: DmpComponent},
      {path: 'dmp/:id', component: DmpComponent},
      {path: 'dmp/:id/version', component: VersionListComponent},
      {path: 'dmp/:id/version/:revision', component: VersionViewComponent}
    ]
  }];
