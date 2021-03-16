import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStoreComponent } from './my-store.component';
import { InsertProductComponent } from './insert-product/insert-product.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { MyCategoriesComponent } from './my-categories/my-categories.component';
import { MyProductsComponent } from './my-products/my-products.component';

const routes: Routes = [
  {
    path: ':id',
    component: MyStoreComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-categories',
      },
      {
        path: 'insert-product',
        component: InsertProductComponent,
      },
      {
        path: 'create-category',
        component: CreateCategoryComponent,
      },
      {
        path: 'my-categories',
        component: MyCategoriesComponent,
      },
      {
        path: 'my-products',
        component: MyProductsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyStoreRoutingModule { }
