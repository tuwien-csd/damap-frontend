import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard, DamapModule } from '@damap/core';
import { ConsentGuard } from './guard/consent.guard';
import { environment } from '../environments/environment';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard, ConsentGuard],
    children: [
      {
        path: '',
        loadChildren: () => DamapModule.forRoot(environment).ngModule,
      },
    ],
  },
];
