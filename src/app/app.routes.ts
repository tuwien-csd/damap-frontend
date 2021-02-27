import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PlansComponent} from './plans/plans.component';
import {PersonsComponent} from './persons/persons.component';
import {RepositoriesComponent} from './repositories/repositories.component';
import {DmpComponent} from './dmp/dmp.component';
import {LayoutComponent} from './layout/layout.component';

export const APP_ROUTES: Routes = [
  {path: '', component: LayoutComponent, children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'persons', component: PersonsComponent},
      {path: 'repositories', component: RepositoriesComponent},
      {path: 'plans', component: PlansComponent},
      {path: 'dmp', component: DmpComponent},
      {path: 'dmp/:id', component: DmpComponent}
      ]
}];
