import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStoreRoutingModule } from './my-store-routing.module';
import { MyStoreComponent } from './my-store.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { IonicModule } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageOffersComponent } from './manage-offers/manage-offers.component';
import { ToastService } from '@app/shared/toaster/toast.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    MyStoreComponent,
    ManageProductComponent,
    ManageCategoryComponent,
    MyProductsComponent,
    ManageOffersComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    MyStoreRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    TranslateModule.forChild()
  ],
  providers: [
    Camera,
    ToastService
  ],
  exports: [ManageCategoryComponent]
})
export class MyStoreModule { }
