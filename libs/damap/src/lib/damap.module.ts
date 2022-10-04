import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {DashboardModule} from './components/dashboard/dashboard.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PlansComponent} from './components/plans/plans.component';
import {PlansModule} from './components/plans/plans.module';
import {TranslateModule} from '@ngx-translate/core';
import {DamapStoreModule} from './store/damap-store.module';

export const DAMAP_ROUTES: Route[] = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'plans', component: PlansComponent},
  {
    path: 'dmp',
    loadChildren: () => import('./components/dmp/dmp.module').then(m => m.DmpModule)
  },
];

const MODULES = [DashboardModule, PlansModule];

@NgModule({
  imports: [
    CommonModule,
    DamapStoreModule,
    TranslateModule,
    RouterModule.forChild(DAMAP_ROUTES),
    ...MODULES
  ],
})
export class DamapModule {
  static forRoot(production: boolean) {
    // service for production property
    return {
      ngModule: DamapModule
    };
  }
}
