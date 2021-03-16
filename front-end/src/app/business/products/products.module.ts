import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from '@app/shared/shared.module';
import { ProductsService } from './service/products.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    IonicModule,
    TranslateModule.forChild()

  ],
  providers: [
    ProductsService
  ]
})

export class ProductsModule { }
