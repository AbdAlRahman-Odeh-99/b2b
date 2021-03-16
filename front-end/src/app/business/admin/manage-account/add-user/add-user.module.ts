import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserRoutingModule } from './add-user-routing.module';
import { AddUserComponent } from './add-user.component';
import { IonicModule } from '@ionic/angular';
import { ToastService } from '@app/shared/toaster/toast.service';


@NgModule({
  declarations: [AddUserComponent],
  imports: [
    CommonModule,
    AddUserRoutingModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  providers: [
    ToastService
  ]
})
export class AddUserModule { }
