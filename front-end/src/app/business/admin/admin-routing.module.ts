import { AdminRoutingConstants } from './../../core/constants/routes';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth/auth.guard';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: AdminRoutingConstants.ADD_USER,
        pathMatch: AdminRoutingConstants.MANAGE_ACCOUNT
      },
      {
        // tslint:disable-next-line: max-line-length
        path: AdminRoutingConstants.MANAGE_ACCOUNT, loadChildren: () => import('./manage-account/manage-account.module').then(m => m.ManageAccountModule), canActivate: [AuthGuard],
      },
      {
        // tslint:disable-next-line: max-line-length
        path: AdminRoutingConstants.COMPLAINTS, loadChildren: () => import('../complaints/complaints.module').then(m => m.ComplaintsModule), canActivate: [AuthGuard],
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
