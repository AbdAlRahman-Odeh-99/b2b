import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoComponent } from './info.component';
import { AboutStoreComponent } from './component/about-store/about-store.component';
import { OffersComponent } from './component/offers/offers.component';
import { ProductsComponent } from './component/products/products.component';
import { CategoriesComponent } from './component/categories/categories.component';

const routes: Routes = [
  {
    path: ':id/tabs',
    component: InfoComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'about-store',
      },
      {
        path: 'about-store',
        component: AboutStoreComponent,
      },
      {
        path: 'offers',
        component: OffersComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
