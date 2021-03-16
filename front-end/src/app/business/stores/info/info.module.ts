import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { AboutStoreComponent } from './component/about-store/about-store.component';
import { InfoComponent } from './info.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { OffersComponent } from './component/offers/offers.component';
import { ProductsComponent } from './component/products/products.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { BusinessService } from '../../services/business.service';

@NgModule({
  declarations: [
    InfoComponent,
    AboutStoreComponent,
    OffersComponent,
    ProductsComponent,
    CategoriesComponent,
    AboutStoreComponent
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    IonicModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  providers: [
    BusinessService,
  ],
})
export class InfoModule { }
