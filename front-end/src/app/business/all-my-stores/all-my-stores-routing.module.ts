import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllMyStoresComponent } from './all-my-stores.component';

const routes: Routes = [
  {
    path: '',
    component: AllMyStoresComponent,
  },
  {
    path: 'store-info',
    loadChildren: () => import('./my-store/my-store.module').then(m => m.MyStoreModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllMyStoresRoutingModule { }
