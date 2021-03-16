import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAccountRoutingModule } from './manage-account-routing.module';
import { ManageAccountComponent } from './manage-account.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ManageAccountComponent],
  imports: [
    CommonModule,
    IonicModule,
    ManageAccountRoutingModule,
    TranslateModule.forChild()
  ]
})
export class ManageAccountModule { }
