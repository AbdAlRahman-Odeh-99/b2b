import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AllMyStoresRoutingModule } from './all-my-stores-routing.module';
import { AllMyStoresComponent } from './all-my-stores.component';


@NgModule({
  declarations: [AllMyStoresComponent],
  imports: [
  CommonModule,
    AllMyStoresRoutingModule
  ],
  providers: [
    HttpClientModule
  ]
})
export class AllMyStoresModule { }
