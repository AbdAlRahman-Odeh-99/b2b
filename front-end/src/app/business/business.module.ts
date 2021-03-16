import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';
import { HttpClientModule } from '@angular/common/http';

import { BusinessRoutingModule } from './business-routing.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { BusinessService } from './services/business.service';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    BusinessRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
    HttpClientModule
  ],
  declarations: [
    BusinessComponent,
  ],
  providers: [
    BusinessService,
  ]
})

export class BusinessModule { }
