import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { IonicModule } from '@ionic/angular';
import { AdminService } from './service/admin.service';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    IonicModule,
    AdminRoutingModule,
    TranslateModule.forChild()
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
