import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth/auth.guard';

import { ManageAccountComponent } from './manage-account.component';

const routes: Routes = [{
  path: '',
  component: ManageAccountComponent,
  children: [
    {
      path: '',
      redirectTo: 'users',
      pathMatch: 'full'
    },
    {
      // tslint:disable-next-line: max-line-length
      path: 'users', loadChildren: () => import('./view-users/view-users.module').then(m => m.ViewUsersModule), canActivate: [AuthGuard],
    },
    {
      path: 'add-user', loadChildren: () => import('./add-user/add-user.module').then(m => m.AddUserModule), canActivate: [AuthGuard],
    },
    {
      // tslint:disable-next-line: max-line-length
      path: 'remove-user', loadChildren: () => import('./remove-user/remove-user.module').then(m => m.RemoveUserModule), canActivate: [AuthGuard],
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAccountRoutingModule { }

