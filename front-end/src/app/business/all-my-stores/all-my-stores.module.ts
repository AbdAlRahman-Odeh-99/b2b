import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AllMyStoresRoutingModule } from './all-my-stores-routing.module';
import { AllMyStoresComponent } from './all-my-stores.component';
import { SharedModule } from '@app/shared/shared.module';
import { MyStoresService } from './services/my-stores.service';
import { ManageStoreInfoComponent } from './manage-store-info/manage-store-info.component';
import { IonicModule } from '@ionic/angular';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [AllMyStoresComponent, ManageStoreInfoComponent],
  imports: [
    CommonModule,
    AllMyStoresRoutingModule,
    SharedModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    TranslateModule.forChild()
  ],
  providers: [
    MyStoresService
  ]
})
export class AllMyStoresModule { }
