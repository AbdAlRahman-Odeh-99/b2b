import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    IonicModule,
    OrdersRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild()
  ]
})
export class OrdersModule { }
