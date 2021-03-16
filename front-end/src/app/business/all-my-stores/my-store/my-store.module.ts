import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStoreRoutingModule } from './my-store-routing.module';
import { MyStoreComponent } from './my-store.component';
import { InsertProductComponent } from './insert-product/insert-product.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { MyCategoriesComponent } from './my-categories/my-categories.component';
import { IonicModule } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    MyStoreComponent, InsertProductComponent, CreateCategoryComponent, MyProductsComponent, MyCategoriesComponent
  ],
  imports: [
    CommonModule,
    MyStoreRoutingModule,
    IonicModule,
    SharedModule
  ],
  providers: [
    Camera
  ],
  exports: [CreateCategoryComponent]
})
export class MyStoreModule { }
