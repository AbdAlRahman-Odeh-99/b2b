import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemoveUserComponent } from './remove-user.component';

const routes: Routes = [{ path: '', component: RemoveUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoveUserRoutingModule { }
