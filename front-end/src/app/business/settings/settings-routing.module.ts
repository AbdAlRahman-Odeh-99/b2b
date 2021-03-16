import { SettingsRoutingConstants } from './../../core/constants/routes';
import { ManageAccountComponent } from './../admin/manage-account/manage-account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

const routes: Routes = [
  { 
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: SettingsRoutingConstants.GENERAL
      },
      {
        path: SettingsRoutingConstants.MANAGE_ACCOUNTS,
        component: ManageAccountComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
