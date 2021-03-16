import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MyCarsRoutingModule } from './my-cars-routing.module';
import { MyCarsComponent } from './my-cars.component';
import { CarsService } from './service/cars.service';
import {  ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '@app/shared/toaster/toast.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [MyCarsComponent],
  imports: [
    CommonModule,
    MyCarsRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  providers: [
    CarsService,
    ToastService
  ]
})
export class MyCarsModule { }
