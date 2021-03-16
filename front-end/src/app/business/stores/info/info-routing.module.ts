import { StoreInfoRoutingConstants } from './../../../core/constants/routes';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoComponent } from './info.component';
import { AboutStoreComponent } from './component/about-store/about-store.component';
import { OffersComponent } from './component/offers/offers.component';
import { ProductsComponent } from './component/products/products.component';

const routes: Routes = [
  {
    path: `:${StoreInfoRoutingConstants.ID}/${StoreInfoRoutingConstants.TABS}`,
    component: InfoComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: StoreInfoRoutingConstants.ABOUT_STORE,
      },
      {
        path: StoreInfoRoutingConstants.ABOUT_STORE,
        component: AboutStoreComponent,
      },
      {
        path: StoreInfoRoutingConstants.OFFERS,
        component: OffersComponent,
      },
      {
        path: StoreInfoRoutingConstants.PRODUCTS,
        component: ProductsComponent,
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
