import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpInfoService } from './services/sign-up/sign-up-info.service';
import { AuthService } from './services/auth/auth.service';
import { TokenHandlerService } from './services/token-handler/token-handler.service';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    SignUpInfoService,
    AuthService,
    TokenHandlerService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
