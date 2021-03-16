import { SharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { IonicModule } from '@ionic/angular';
@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    SharedModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    ResetPasswordComponent
  ],
  exports: [],
  providers: []
})
export class AuthModule { }
