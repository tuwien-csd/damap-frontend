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
    path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
      {path: '', component: DashboardComponent, canActivate: [ConsentGuard]},
      {path: 'dashboard', component: DashboardComponent, canActivate: [ConsentGuard]},
      {path: 'plans', component: PlansComponent, canActivate: [ConsentGuard]},
      {path: 'dmp', component: DmpComponent, canActivate: [ConsentGuard]},
      {path: 'dmp/:id', component: DmpComponent, canActivate: [ConsentGuard]},
      {path: 'dmp/:id/version', component: VersionListComponent},
      {path: 'dmp/:id/version/:revision', component: VersionViewComponent}
    ]
  }];
