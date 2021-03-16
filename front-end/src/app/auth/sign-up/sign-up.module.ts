import { TranslateModule } from '@ngx-translate/core';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { CreateGarageOwnerComponent } from './CreateGarageOwner/CreateGarageOwner.component';
import { CreateCarOwnerComponent } from './CreateCarOwner/CreateCarOwner.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    SignUpComponent,
    CreateCarOwnerComponent,
    CreateGarageOwnerComponent,
    UserInfoComponent
  ],
  imports: [
    IonicModule,
    SignUpRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  providers: [

  ],
})


export class SignUpModule {

}
