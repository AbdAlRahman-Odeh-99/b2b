import { AllMyStoresRoutingConstants } from './../../core/constants/routes';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllMyStoresComponent } from './all-my-stores.component';
import { AuthGuard } from '@app/core/guards/auth/auth.guard';
import { ManageStoreInfoComponent } from './manage-store-info/manage-store-info.component';

const routes: Routes = [
  {
    path: '',
    component: AllMyStoresComponent,
    pathMatch: AllMyStoresRoutingConstants.STORE_INFO,
    canActivate: [AuthGuard]
  },
  {
    path: `${AllMyStoresRoutingConstants.STORE_INFO}/:${AllMyStoresRoutingConstants.ID}`,
    loadChildren: () => import('./my-store/my-store.module').then(m => m.MyStoreModule),
    canActivate: [AuthGuard]
  },
  {
    path: AllMyStoresRoutingConstants.ADD_STORE,
    component: ManageStoreInfoComponent,
  },
  {
    path: `${AllMyStoresRoutingConstants.EDIT_STORE}/:${AllMyStoresRoutingConstants.STOREID}`,
    component: ManageStoreInfoComponent,
  },
  {
    path: AllMyStoresRoutingConstants.ORDERS,
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllMyStoresRoutingModule { }
