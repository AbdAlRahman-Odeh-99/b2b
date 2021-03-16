import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStoreComponent } from './my-store.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageOffersComponent } from './manage-offers/manage-offers.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { AuthGuard} from '@app/core/guards/auth/auth.guard';
import { BusinessAllowedGuard} from '@app/core/guards/business-allowed.guard';
import { MyStoreRoutingConstants } from '@app/core/constants/routes';

const routes: Routes = [
  {
    path: '',
    component: MyStoreComponent,
    canActivate: [AuthGuard, BusinessAllowedGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: MyStoreRoutingConstants.MY_PRODUCTS,
      },
      {
        path: MyStoreRoutingConstants.MANAGE_PRODUCT,
        // pathMatch: 'full',
        redirectTo: `${MyStoreRoutingConstants.MANAGE_PRODUCT}/${MyStoreRoutingConstants.INSERT}`,
      },
      {
        path: `${MyStoreRoutingConstants.MANAGE_PRODUCT}/${MyStoreRoutingConstants.INSERT}`,
        component: ManageProductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: `${MyStoreRoutingConstants.MANAGE_PRODUCT}/${MyStoreRoutingConstants.EDIT}/:${MyStoreRoutingConstants.PRODUCTID}`,
        component: ManageProductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: MyStoreRoutingConstants.MANAGE_CATEGORY,
        component: ManageCategoryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: MyStoreRoutingConstants.MANAGE_OFFERS,
        component: ManageOffersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: MyStoreRoutingConstants.MY_PRODUCTS,
        component: MyProductsComponent,
        canActivate: [AuthGuard, BusinessAllowedGuard],
        // canLoad: [BusinessAllowedGuard]
      },
      {
        path: MyStoreRoutingConstants.ORDERS,
        component: MyProductsComponent,
        canActivate: [AuthGuard, BusinessAllowedGuard],
        // canLoad: [BusinessAllowedGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyStoreRoutingModule { }
